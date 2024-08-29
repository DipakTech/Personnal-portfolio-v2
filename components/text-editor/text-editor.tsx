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
import { Dispatch, SetStateAction, useEffect } from "react";
import { Content } from "@tiptap/core";

export const ExampleForm = ({
  aiGenerated,
  handleChange,
}: {
  aiGenerated: Content;
  handleChange: (val: any) => void;
}) => {
  const formSchema = z.object({
    description: z.any(),
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
                  content={aiGenerated}
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
