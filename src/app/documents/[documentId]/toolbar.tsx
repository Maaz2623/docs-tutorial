"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { type Level } from "@tiptap/extension-heading";
import {
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheck2Icon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColorResult, SketchPicker } from "react-color";

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 flex-col min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="text-xs">A</span>
          <div
            className="h-0.5 w-full"
            style={{
              backgroundColor: value,
            }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0 p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#FFFFFF";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 flex-col min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0 p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    {
      label: "Normal Text",
      value: 0,
      fontSize: "16px",
    },
    {
      label: "Heading 1",
      value: 1,
      fontSize: "32px",
    },
    {
      label: "Heading 2",
      value: 2,
      fontSize: "24px",
    },
    {
      label: "Heading 3",
      value: 3,
      fontSize: "20px",
    },
    {
      label: "Heading 4",
      value: 4,
      fontSize: "18px",
    },
    {
      label: "Heading 5",
      value: 5,
      fontSize: "16px",
    },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }

    return "Normal Text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1">
        {headings.map((heading) => (
          <DropdownMenuItem
            onClick={() => {
              if (heading.value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: heading.value as Level })
                  .run();
              }
            }}
            key={heading.value}
            style={{
              fontSize: heading.fontSize,
            }}
            className={cn(
              "flex items-center gap-x-2 text-md cursor-pointer px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              ((heading.value === 0 && !editor?.isActive("heading")) ||
                editor?.isActive("heading", { level: heading.value })) &&
                heading.value &&
                "bg-neutral-200/80"
            )}
          >
            <span className="text-">{heading.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
    { label: "Helvetica", value: "Helvetica" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Gill Sans", value: "Gill Sans" },
    { label: "Century Gothic", value: "Century Gothic" },
    { label: "Palatino", value: "Palatino" },
    { label: "Garamond", value: "Garamond" },
    { label: "Book Antiqua", value: "Book Antiqua" },
    { label: "Lucida Console", value: "Lucida Console" },
    { label: "Consolas", value: "Consolas" },
    { label: "Monaco", value: "Monaco" },
    { label: "Andale Mono", value: "Andale Mono" },
    { label: "Brush Script MT", value: "Brush Script MT" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
    { label: "Impact", value: "Impact" },
    { label: "Papyrus", value: "Papyrus" },
    { label: "Segoe UI", value: "Segoe UI" },
    { label: "Candara", value: "Candara" },
    { label: "Calibri", value: "Calibri" },
    { label: "San Francisco", value: "San Francisco" },
    { label: "Geneva", value: "Geneva" },
    { label: "Menlo", value: "Menlo" },
    { label: "Ubuntu", value: "Ubuntu" },
    { label: "Liberation Sans", value: "Liberation Sans" },
    { label: "DejaVu Sans", value: "DejaVu Sans" },
    { label: "Optima", value: "Optima" },
    { label: "Franklin Gothic", value: "Franklin Gothic" },
    { label: "Futura", value: "Futura" },
    { label: "Rockwell", value: "Rockwell" },
    { label: "Baskerville", value: "Baskerville" },
    { label: "Copperplate", value: "Copperplate" },
    { label: "Didot", value: "Didot" },
    { label: "Perpetua", value: "Perpetua" },
    { label: "Zapfino", value: "Zapfino" },
    { label: "Arial Black", value: "Arial Black" },
    { label: "Lucida Sans", value: "Lucida Sans" },
    { label: "Charcoal", value: "Charcoal" },
    { label: "Candida", value: "Candida" },
    { label: "Antiqua", value: "Antiqua" },
    { label: "Avant Garde", value: "Avant Garde" },
    { label: "Geneva Sans", value: "Geneva Sans" },
    { label: "Lucida Bright", value: "Lucida Bright" },
    { label: "ITC Bauhaus", value: "ITC Bauhaus" },
    { label: "Serifa", value: "Serifa" },
    { label: "Kabel", value: "Kabel" },
    { label: "Algerian", value: "Algerian" },
    { label: "Wide Latin", value: "Wide Latin" },
    { label: "Bodoni", value: "Bodoni" },
    { label: "Eras", value: "Eras" },
    { label: "OCR A", value: "OCR A" },
    { label: "OCR B", value: "OCR B" },
    { label: "Eurostile", value: "Eurostile" },
    { label: "Univers", value: "Univers" },
    { label: "Tekton", value: "Tekton" },
    { label: "Chalkboard", value: "Chalkboard" },
    { label: "Cooper Black", value: "Cooper Black" },
    { label: "Freestyle Script", value: "Freestyle Script" },
    { label: "Vladimir Script", value: "Vladimir Script" },
    { label: "Segoe Script", value: "Segoe Script" },
    { label: "Kristen ITC", value: "Kristen ITC" },
    { label: "Berlin Sans", value: "Berlin Sans" },
    { label: "Bradley Hand", value: "Bradley Hand" },
    { label: "Zapf Chancery", value: "Zapf Chancery" },
    { label: "Courier", value: "Courier" },
    { label: "MS Sans Serif", value: "MS Sans Serif" },
    { label: "MS Serif", value: "MS Serif" },
    { label: "Segoe Print", value: "Segoe Print" },
    { label: "Monotype Corsiva", value: "Monotype Corsiva" },
    { label: "Stencil", value: "Stencil" },
    { label: "Herculanum", value: "Herculanum" },
    { label: "Haettenschweiler", value: "Haettenschweiler" },
    { label: "Lucida Handwriting", value: "Lucida Handwriting" },
    { label: "Playbill", value: "Playbill" },
    { label: "Copperplate Gothic", value: "Copperplate Gothic" },
    { label: "Elephant", value: "Elephant" },
    { label: "Goudy Old Style", value: "Goudy Old Style" },
    { label: "Mistral", value: "Mistral" },
    { label: "Segoe Light", value: "Segoe Light" },
    { label: "Bauhaus 93", value: "Bauhaus 93" },
    { label: "Script MT", value: "Script MT" },
    { label: "Chalkduster", value: "Chalkduster" },
    { label: "Gill Sans MT", value: "Gill Sans MT" },
    { label: "American Typewriter", value: "American Typewriter" },
    { label: "Apple Chancery", value: "Apple Chancery" },
    { label: "Big Caslon", value: "Big Caslon" },
    { label: "Comic Neue", value: "Comic Neue" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 h-[200px] overflow-y-scroll scrollbar-track-gray-800 scrollbar-thin">
        {fonts.map((font) => (
          <DropdownMenuItem
            onClick={() =>
              editor?.chain().focus().setFontFamily(font.value).run()
            }
            key={font.value}
            className={cn(
              "flex items-center gap-x-2 text-md cursor-pointer px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === font.value &&
                "bg-neutral-200/80"
            )}
            style={{ fontFamily: font.value }}
          >
            <span className="text-">{font.label}</span>
            {/* <button
              onClick={() =>
                editor?.chain().focus().setFontFamily(font.value).run()
              }
            ></button> */}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheck2Icon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("Todo Comment"),
        isActive: false,
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#f1f4f9] px-2.5 py-0.5 print:hidden rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
