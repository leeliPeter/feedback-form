"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
  inventoryItem: z
    .string()
    .min(2, "Inventory item must be at least 2 characters"),
  quantity: z.string().min(1, "Quantity is required"),
});

export default function FeedbackPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      feedback: "",
      inventoryItem: "",
      quantity: "",
    },
  });

  async function onSubmit() {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 6000));
      setShowSuccessDialog(true);
      form.reset();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "There was an error submitting your feedback. Please try again.",
      });
      // Log error for debugging
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="home-page min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="mb-8 text-center bg-white rounded-lg shadow-sm p-8 border border-gray-100">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Peter&apos;s Restaurant
          </h1>
          <p className="text-gray-600 text-lg">
            Daily Inventory Feedback System
          </p>
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mb-4"></div>
                <p className="text-lg font-semibold text-gray-800">
                  Processing Your Update...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  This may take 5-10 seconds
                </p>
              </div>
            </div>
          </div>
        )}

        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                Update Successful! 🎉
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center text-gray-700">
                Your inventory update has been successfully submitted to the
                management team.
              </p>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                The update will be reviewed by Josh and Colleen shortly.
              </p>
            </div>
            <DialogFooter className="sm:justify-center">
              <Button
                onClick={() => setShowSuccessDialog(false)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Staff Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          {...field}
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="inventoryItem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Inventory Item
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter inventory item name"
                          {...field}
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Available Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter quantity"
                          type="number"
                          {...field}
                          className="border-gray-200 focus:border-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Additional Notes
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional information about the inventory item..."
                        className="min-h-[120px] border-gray-200 focus:border-gray-400 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white py-6 rounded-lg text-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Inventory Update"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
