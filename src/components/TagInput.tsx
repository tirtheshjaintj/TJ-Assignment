import React, { useState, useEffect } from "react";
import { WithContext as ReactTags, type Tag } from "react-tag-input";

interface TagInputProps {
  tags: string[];
  suggestions: string[];
  placeholder?: string;
  onChange: (tags: string[]) => void;
}




const TagInput: React.FC<TagInputProps> = ({
  tags,
  suggestions,
  placeholder = "Add a tag",
  onChange,
}) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [suggestionTags, setSuggestionTags] = useState<Tag[]>([]);
  const [query, setQuery] = useState("");

  // Convert string[] to Tag[]
  const toReactTags = (arr: string[]): Tag[] =>
    arr.map((text, id) => ({ id: id.toString(), text, className: "" }));

  // Sync selectedTags state with prop tags
  useEffect(() => {
    setSelectedTags(toReactTags(tags));
  }, [tags]);

  // Filter suggestions based on query
  useEffect(() => {
   
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestionTags(toReactTags(filtered));
    
  }, [suggestions, query]);

  const handleAddition = (tag: Tag) => {
    // Only add if tag.text is in suggestions (case insensitive)
    const lowerSuggestionSet = new Set(
      suggestions.map((s) => s.toLowerCase())
    );
    if (!lowerSuggestionSet.has(tag.text.toLowerCase())) {
      return;
    }

    // Prevent duplicates (case insensitive)
    if (
      selectedTags.some(
        (t) => t.text.toLowerCase() === tag.text.toLowerCase()
      )
    ) {
      return;
    }

    const newTags = [...selectedTags, tag];
    setSelectedTags(newTags);
    onChange(newTags.map((t) => t.text));
    setQuery(""); // Clear query after adding a tag
  };

  const handleDelete = (index: number) => {
    const newTags = selectedTags.filter((_, i) => i !== index);
    setSelectedTags(newTags);
    onChange(newTags.map((t) => t.text));
  };

  const handleInputChange = (input: string) => {
    setQuery(input);
  };

  return (
    <div className="tag-input">
      <ReactTags
        tags={selectedTags}
        suggestions={suggestionTags}
        handleAddition={handleAddition}
        handleDelete={handleDelete}
        handleInputChange={handleInputChange}
        inputFieldPosition="inline"
        autocomplete
        minQueryLength={1}
        placeholder={placeholder}
        allowUnique
        allowDragDrop
        autoFocus={false}
        classNames={{
          tags: "tags-container",
          tagInput: "tag-input-field",
          tag: "tag",
          remove: "tag-remove",
          suggestions: "suggestions",
          activeSuggestion: "active-suggestion",
        }}
      />
      <style>{`
        .ReactTags__tagInputField{
          padding:2px;
          outline:none;
        }
        .tag-input {
          width: 100%;
          position: relative;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
          padding: 0.375rem 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
          min-height: 2.25rem;
          align-items: center;
          background-color: white;
        }

        .tag {
          background-color: #3b82f6;
          color: white;
          padding: 0.125rem 0.625rem;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          font-size: 0.875rem;
          line-height: 1.25rem;
          max-width: max-content;
          white-space: nowrap;
        }

        .tag-remove {
          margin-left: 0.4rem;
          cursor: pointer;
          font-weight: bold;
          user-select: none;
          font-size: 1rem;
          line-height: 1;
          color: rgba(255, 255, 255, 0.85);
          transition: color 0.2s ease;
        }
        .tag-remove:hover {
          color: rgba(255, 255, 255, 1);
        }

        .tag-input-field {
          flex-grow: 1;
          min-width: 4rem;
          border: none;
          outline: none;
          font-size: 1rem;
          line-height: 1.5rem;
          padding: 0.25rem 0.5rem;
          background-color: transparent;
          color: #111827;
        }

        .suggestions {
          position: absolute;
          top: 100%;
          cursor:pointer;
          left: 0;
          right: 0;
          margin-top: 0.25rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          padding:5px;
          background-color: white;
          max-height: 12rem;
          overflow-y: auto;
          z-index: 50;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .suggestion-item {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          line-height: 1.5rem;
          cursor: pointer;
          user-select: none;
        }

        .active-suggestion {
          background-color: #dbeafe;
        }
        .tag-wrapper{
          margin:2px;
          border-radius:2px;  
        }

        @media (max-width: 640px) {
          .tags-container {
            padding: 0.25rem 0.375rem;
            min-height: 2rem;
          }
          .tag {
            font-size: 0.8rem;
            padding: 0.125rem 0.5rem;
          }
          .tag-input-field {
            font-size: 0.9rem;
          }
          .suggestion-item {
            font-size: 0.9rem;
            padding: 0.4rem 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TagInput;