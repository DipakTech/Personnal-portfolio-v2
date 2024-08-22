"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MinimalTiptapEditor } from "../minimal-tiptap";
import { useEffect, useState } from "react";
import { Content } from "@tiptap/core";

export const ExampleForm = ({ aiGenerated }: { aiGenerated: string }) => {
  const [globalState, setEditglobalState] = useState<string | Content | null>(
    aiGenerated,
  );

  const formSchema = z.object({
    description: z
      .string({
        required_error: "Description is required",
      })
      .min(1, "Description is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      description: aiGenerated,
    },
  });

  const { setValue } = form;

  useEffect(() => {
    if (aiGenerated) {
      setValue("description", aiGenerated);
    }
  }, [aiGenerated, setValue]);

  const handleChange = (value: any): void => {
    setEditglobalState(value);
    // setValue("description", value);
  };

  return (
    <Form {...form}>
      <form className="w-full space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Description</FormLabel>
              <FormControl>
                <MinimalTiptapEditor
                  {...field}
                  content={globalState}
                  onChange={handleChange}
                  throttleDelay={2000}
                  className={cn("w-full h-auto", {
                    "border-destructive focus-within:border-destructive":
                      form.formState.errors.description,
                  })}
                  editorContentClassName="p-5"
                  output="html"
                  placeholder="Type your description here..."
                  autofocus={true}
                  immediatelyRender={true}
                  editable={true}
                  injectCSS={true}
                  shouldRerenderOnTransaction={false}
                  editorClassName="focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
