import { MousePointerClick } from "@/components/ui/icons";
import { useAppStore } from "../../store/app-store";
import { Button } from "../ui/button";

function SelectAndEditModeToggleButton() {
  const { inSelectAndEditMode, toggleInSelectAndEditMode } = useAppStore();

  return (
    <Button
      onClick={toggleInSelectAndEditMode}
      className="flex items-center gap-x-2 dark:text-white dark:bg-gray-700 regenerate-btn"
      variant={inSelectAndEditMode ? "destructive" : "default"}
    >
      <MousePointerClick className="h-4 w-4" />
      <span>
        {inSelectAndEditMode ? "Exit selection mode" : "Select and update"}
      </span>
    </Button>
  );
}

export default SelectAndEditModeToggleButton;