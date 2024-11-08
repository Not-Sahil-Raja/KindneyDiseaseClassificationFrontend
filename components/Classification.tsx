"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  X,
  AlertCircle,
  Download,
  History,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";
import { nanoid } from "nanoid";

type ClassificationResult = {
  id: string;
  date: Date;
  classification: string;
  confidence: number;
  imageUrl: string;
};

export default function EnhancedKidneyClassification() {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [history, setHistory] = useState<ClassificationResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem("classificationHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("classificationHistory", JSON.stringify(history));
  }, [history]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG, etc.).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB. Please upload a smaller image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setSelectedFile(file);
      setError(null);
    };
    reader.onerror = () => {
      setError("Failed to read the file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const classifyImage = async () => {
    const generatedId = nanoid();
    if (!selectedFile) return;
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/predict/file`, // Use your backend URL here
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const CurrentResult = {
        id: generatedId,
        date: new Date(),
        classification: response.data.result,
        confidence: response.data.confidence,
        imageUrl: selectedFile ? URL.createObjectURL(selectedFile) : "",
      };
      setResult(CurrentResult);
      setHistory((prev) => [CurrentResult, ...prev].slice(0, 10)); // Keep only the last 10 results

      if (response.status === 200) {
        setError(null);
        setImage(null);
        setSelectedFile(null);
      }
    } catch (err) {
      setError("An error occurred during classification. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = (result: ClassificationResult) => {
    const report = `
      Kidney Disease Classification Report
      Date: ${result.date.toLocaleString()}
      Classification: ${result.classification}
      Confidence: ${result.confidence.toFixed(2)}%
    `;
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kidney_classification_report_${result.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("classificationHistory");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Test Your Kidney Scan Image
      </h1>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="relative">
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : image || undefined
              }
              alt="Uploaded kidney scan"
              className="max-h-64 mx-auto"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-0 right-0"
              onClick={() => setImage(null)}
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <Upload
              className="mx-auto h-12 w-12 text-gray-400"
              aria-hidden="true"
            />
            <p className="mt-2">
              Drag and drop your kidney scan image here, or click to select
            </p>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
          id="fileInput"
          aria-label="Upload kidney scan image"
        />
        <Button
          className="mt-4"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          Select Image
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4">
        <Button
          className="flex-1"
          onClick={classifyImage}
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? "Classifying..." : "Classify Image"}
        </Button>
        <Sheet open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Classification History</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
              {history.length === 0 ? (
                <p className="text-center text-gray-500">
                  No classification history yet.
                </p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 mb-4 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <img
                      src={item.imageUrl}
                      alt="Classified kidney scan"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.classification}</p>
                      <p className="text-sm text-gray-500">
                        {item.date.toLocaleString()} - Confidence:{" "}
                        {item.confidence.toFixed(2)}%
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadReport(item)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </ScrollArea>
            <Button
              variant="outline"
              size="sm"
              onClick={clearHistory}
              className="mt-4 w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear History
            </Button>
          </SheetContent>
        </Sheet>
      </div>

      {isLoading && (
        <div className="space-y-2">
          <p className="text-center">Processing image...</p>
          <Progress value={66} className="w-full" />
        </div>
      )}

      {result && (
        <Card className={`bg-transparent shadow-inner`}>
          <CardHeader>
            <CardTitle>Report</CardTitle>
          </CardHeader>
          <CardContent className=" flex items-center justify-evenly">
            <img
              src={result.imageUrl}
              alt="Classified kidney scan"
              className=" max-h-64 rounded-sm"
            />
            <div
              className={` bg-white/90 px-5 py-2 border
              ${
                result.classification === "NORMAL"
                  ? "border-green-400 shadow-green-400"
                  : "border-red-400 shadow-red-400"
              }
               rounded-sm shadow-lg`}
            >
              <p className="text-lg text-black/70">
                Classification:{" "}
                <span className="font-semibold text-black">
                  {result.classification.toLocaleLowerCase()}
                </span>
              </p>
              <p className="text-lg  text-black/70">
                Confidence:{" "}
                <span className="font-semibold text-black">
                  {result.confidence.toFixed(2)}%
                </span>
              </p>
              <Button className="mt-4" onClick={() => downloadReport(result)}>
                <Download className="mr-2 h-4 w-4" /> Download Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
