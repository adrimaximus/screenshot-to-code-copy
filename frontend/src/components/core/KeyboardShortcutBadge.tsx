import React from "react";
import { CornerDownLeft } from "@/components/ui/icons";

interface KeyboardShortcutBadgeProps {
  letter: string;
}

const KeyboardShortcutBadge: React.FC<KeyboardShortcutBadgeProps> = ({
  letter,
}) => {
  const icon =
    letter.toLowerCase() === "enter" || letter.toLowerCase() === "return" ? (
      <CornerDownLeft className="inline-block h-3 w-3" />
    ) : (
      letter.toUpperCase()
    );

  return (
    <span className="font-mono text-xs ml-2 rounded bg-gray-700 dark:bg-gray-900 text-white py-[2px] px-2 inline-flex items-center">
      {icon}
    </span>
  );
};

export default KeyboardShortcutBadge;