"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Upload,
  AlertCircle,
  Download,
  History,
  Trash2,
  Image,
  SparklesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";

type ClassificationResult = {
  id: string;
  date: Date;
  classification: string;
  confidence: number;
  imageUrl: string;
};

export default function EnhancedKidneyClassification() {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [history, setHistory] = useState<ClassificationResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 100));
      }, 20); // Adjust the speed of the progress bar here

      return () => clearInterval(interval);
    } else {
      setProgress(0); // Reset progress when not loading
    }
  }, [isLoading]);

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
    reader.onload = () => {
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
    <>
      {" "}
      <div
        className="h-[100vh] flex items-center justify-evenly pt-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #f0f4f3, #e0e6e4 40%, #d0d8d6 70%, #f0f4f3), radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.1))",
        }}
      >
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          )}
          cr={1.5}
        />

        <motion.div
          className="flex w-fit h-full justify-center items-center z-10"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="max-w-lg mx-auto  space-y-6 bg-white rounded-lg border-4 border-white shadow-lg "
            style={{
              boxShadow: "inset 0 0 0  1.2px #d2dfd9",
            }}
          >
            <div className=" font-Articulate">
              <h1 className="text-2xl font- font-bold text-center mt-8">
                Upload Kidney Scan
              </h1>
              <p className="text-center text-gray-500 mt-2 leading-3 tracking-wide">
                Diagnose your image with a kidney scan!
              </p>
            </div>
            <div
              className={`border-2 border-dashed rounded-lg p-8 mx-6 mt-4 text-center relative ${
                isDragging ? "border-primary" : "border-gray-300"
              }
              
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isLoading && (
                <div
                  className="space-y-2 absolute w-full rounded-lg h-full flex items-center justify-center px-4 top-1/2 left-0 -translate-y-1/2 backdrop-blur-md"
                  style={{
                    background:
                      " linear-gradient(145deg, rgba(244, 246, 245, 0.8), rgba(228, 230, 219, 0.8) 40%, rgba(228, 230, 219, 0.6) 70%, rgba(244, 246, 245, 0.6)), radial-gradient(circle at 50% 50%, rgba(244, 246, 245, 0.2), rgba(228, 230, 219, 0.2))",
                  }}
                >
                  <div className=" flex flex-col items-center justify-center space-y-2 w-full">
                    <p className="text-center font-Articulate font-bold">
                      Processing image...
                    </p>
                    <div className="relative w-full h-2 bg-gray-200 rounded">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#6ec71a] rounded animate-progress"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <Upload className="mx-auto  text-gray-400" aria-hidden="true" />
              <p className="mt-2  text-black/60 font-Articulate font-medium">
                Drag and drop your kidney scan image here,
                <br />
                or click to select
              </p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
                id="fileInput"
                aria-label="Upload kidney scan image"
              />
              <Button
                className="mt-4 font-Articulate shadow-lg border-2"
                variant="outline"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                Select Image
              </Button>
            </div>
            <AnimatePresence>
              {selectedFile && (
                <motion.div
                  className="relative flex items-center justify-start px-1 py-2 shadow-md border-[1.2px] mx-2 rounded-md"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Image className="text-gray-700 mx-4" />
                  <div className="flex flex-col justify-center items-start w-36 mr-auto">
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="font-medium text-sm text-gray-700">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>

                  <Button
                    variant="destructive"
                    size="icon"
                    className="mx-2"
                    onClick={() => setSelectedFile(null)}
                    aria-label="Remove image"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4 w-full justify-between border-t-[1.5px] border-[##d2dfd9] pt-4 px-6 pb-3">
              <Button
                className=" w-fit"
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
                            <p className="font-semibold">
                              {item.classification}
                            </p>
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
          </div>
        </motion.div>
        {/* Result part */}
        <AnimatePresence>
          <motion.div
            className=" w-[44vw] px-4 min-h-96 h-fit py-5  rounded-xl shadow-lg backdrop-blur-md border flex items-center justify-center"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2) 40%, rgba(255, 255, 255, 0.4) 70%, rgba(255, 255, 255, 0.4)), radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1))",
            }}
            initial={{ opacity: 0, filter: "blur(40px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(40px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {result ? (
              <motion.div
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Card className="bg-white shadow py-5 w-full font-Articulate">
                  <div className=" flex justify-evenly gap-3  px-5">
                    <div className="w-full flex flex-col   rounded-sm ">
                      <div className=" pt-3">
                        <p className=" font-bold text-xl">Result Ready</p>
                        <p className=" text-xs line-clamp-1 text-black/60 font-medium">
                          Note: This model may sometimes be wrong.
                        </p>
                      </div>
                      <div
                        className=" flex mx-2 mt-3 rounded-lg px-4 py-3 leading-none border border-[#ffffff]"
                        style={{
                          background:
                            result.classification === "NORMAL"
                              ? "linear-gradient(145deg, rgba(102, 178, 119, 0.8), rgba(102, 178, 119, 0.8) 40%, rgba(102, 178, 119, 0.6) 70%, rgba(255, 255, 255, 0.6)), radial-gradient(circle at 50% 50%, rgba(102, 178, 119, 0.2), rgba(255, 255, 255, 0.2))"
                              : "linear-gradient(145deg, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0.8) 40%, rgba(255, 0, 0, 0.6) 70%, rgba(255, 255, 255, 0.6)), radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.2), rgba(255, 255, 255, 0.2))",
                        }}
                      >
                        <div className=" flex flex-col">
                          <p className=" font-medium text-sm text-white/60">
                            Diagnosis
                          </p>
                          <p className=" font-bold text-white pt-1">
                            {result.classification === "NORMAL"
                              ? "Healthy Condition"
                              : result.classification === "STONE"
                              ? "Stone Detected"
                              : result.classification === "TUMOR"
                              ? "Tumor Found"
                              : result.classification === "CYST"
                              ? "Cyst Detected"
                              : "Issue Detected"}
                          </p>
                        </div>
                      </div>
                      <div
                        className=" flex mx-2 mt-3 rounded-lg px-4 py-3 justify-around leading-none border border-[#dad5d5]"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9), rgba(220, 220, 220, 0.9) 40%, rgba(220, 220, 220, 0.7) 70%, rgba(255, 255, 255, 0.7))",
                        }}
                      >
                        <div className=" flex flex-col justify-center">
                          <p className=" font-medium text-sm text-black/70 pt-1">
                            Confidence Level
                          </p>
                          <p className=" font-bold text-black pt-1">
                            {result.confidence >= 0.75
                              ? "High Confidence"
                              : result.confidence >= 0.5
                              ? "Medium Confidence"
                              : "Low Confidence"}
                          </p>
                        </div>
                        <div className=" border-l-2 bg-transparent text-[#2e2d2d] font-bold  px-2 leading-none flex justify-center items-center ">
                          {result.confidence.toFixed(2)}%
                        </div>
                      </div>
                      <div className="text-center mt-auto w-fit mx-auto flex space-x-4 items-center">
                        <Button
                          className="text-center mt-auto w-fit mx-auto"
                          onClick={() => downloadReport(result)}
                        >
                          <Download className="mr-2 h-4 w-4" /> Download Report
                        </Button>
                        <Button
                          className="text-center mt-2 w-fit mx-auto"
                          onClick={() => setResult(null)}
                          variant="destructive"
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <img
                        src={result.imageUrl}
                        alt="Classified kidney scan"
                        className=" rounded-xl"
                      />
                      <div className=" flex justify-center items-center py-2 bg-[#DDE3E0] rounded-xl">
                        <p className="text  text-black/70 font-medium">
                          {result.date.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <>
                <motion.p
                  className="text-xl flex gap-3 text-black/65"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {" "}
                  <SparklesIcon />
                  <span className="font-Articulate font-medium ">
                    No classification result yet.
                  </span>
                </motion.p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
