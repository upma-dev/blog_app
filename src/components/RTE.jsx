import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-3 pl-1 text-slate-300 font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="feoygoakanf7fw10wicalfahxs1a5e9ye96kyej7w6z9m6h9"
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              skin: "oxide-dark",
              content_css: "dark",
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: `
                body { 
                  font-family: 'Inter', system-ui, sans-serif; 
                  font-size: 14px;
                  background-color: #1e293b;
                  color: #e2e8f0;
                }
                p { color: #e2e8f0; }
                h1, h2, h3, h4, h5, h6 { color: #f8fafc; }
                a { color: #c084fc; }
                blockquote { border-left-color: #c084fc; }
                code { background-color: #334155; color: #c084fc; }
                pre { background-color: #334155; }
              `,
              branding: false,
              resize: true,
              line_height_formats: "1 1.5 2 2.5 3",
              font_formats:
                "Inter=Inter,sans-serif;Arial=arial,helvetica,sans-serif;Times New Roman=times new roman,times,serif;Courier New=courier new,courier,monospace",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
