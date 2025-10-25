import { useEffect } from "react";
import SettingsDialog from "./components/settings/SettingsDialog";
import { AppState, EditorTheme, Settings } from "./types";
import { IS_RUNNING_ON_CLOUD } from "./config";
import { PicoBadge } from "./components/messages/PicoBadge";
import { OnboardingNote } from "./components/messages/OnboardingNote";
import { usePersistedState } from "./hooks/usePersistedState";
import TermsOfServiceDialog from "./components/TermsOfServiceDialog";
import { Stack } from "./lib/stacks";
import { CodeGenerationModel } from "./lib/models";
import useBrowserTabIndicator from "./hooks/useBrowserTabIndicator";
import { useAppStore } from "./store/app-store";
import Sidebar from "./components/sidebar/Sidebar";
import PreviewPane from "./components/preview/PreviewPane";
import { GenerationSettings } from "./components/settings/GenerationSettings";
import StartPane from "./components/start-pane/StartPane";
import GenerateFromText from "./components/generate-from-text/GenerateFromText";
import { useCodeGeneration } from "./hooks/useCodeGeneration";

function App() {
  const { appState } = useAppStore();

  // Settings
  const [settings, setSettings] = usePersistedState<Settings>(
    {
      openAiApiKey: null,
      openAiBaseURL: null,
      anthropicApiKey: null,
      screenshotOneApiKey: null,
      isImageGenerationEnabled: true,
      editorTheme: EditorTheme.COBALT,
      generatedCodeConfig: Stack.HTML_TAILWIND,
      codeGenerationModel: CodeGenerationModel.CLAUDE_4_5_SONNET_2025_09_29,
      // Only relevant for hosted version
      isTermOfServiceAccepted: false,
    },
    "setting"
  );

  const {
    doCreate,
    doCreateFromText,
    doUpdate,
    regenerate,
    reset,
    importFromCode,
    cancelCodeGeneration,
  } = useCodeGeneration(settings);

  const showSelectAndEditFeature =
    settings.generatedCodeConfig === Stack.HTML_TAILWIND ||
    settings.generatedCodeConfig === Stack.HTML_CSS;

  // Indicate coding state using the browser tab's favicon and title
  useBrowserTabIndicator(appState === AppState.CODING);

  // When the user already has the settings in local storage, newly added keys
  // do not get added to the settings so if it's falsy, we populate it with the default
  // value
  useEffect(() => {
    if (!settings.generatedCodeConfig) {
      setSettings((prev) => ({
        ...prev,
        generatedCodeConfig: Stack.HTML_TAILWIND,
      }));
    }
  }, [settings.generatedCodeConfig, setSettings]);

  const handleTermDialogOpenChange = (open: boolean) => {
    setSettings((s) => ({
      ...s,
      isTermOfServiceAccepted: !open,
    }));
  };

  function setStack(stack: Stack) {
    setSettings((prev) => ({
      ...prev,
      generatedCodeConfig: stack,
    }));
  }

  // The `importFromCode` function now needs to set the stack in the settings.
  // The hook doesn't have access to `setSettings`. So I'll create a wrapper.
  function handleImportFromCode(code: string, stack: Stack) {
    setStack(stack);
    importFromCode(code, stack);
  }

  return (
    <div className="mt-2 dark:bg-black dark:text-white">
      {IS_RUNNING_ON_CLOUD && <PicoBadge />}
      {IS_RUNNING_ON_CLOUD && (
        <TermsOfServiceDialog
          open={!settings.isTermOfServiceAccepted}
          onOpenChange={handleTermDialogOpenChange}
        />
      )}
      <div className="lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-96 lg:flex-col">
        <div className="flex grow flex-col gap-y-2 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:bg-zinc-950 dark:text-white">
          {/* Header with access to settings */}
          <div className="flex items-center justify-between mt-10 mb-2">
            <h1 className="text-2xl ">Screenshot to Code</h1>
            <SettingsDialog settings={settings} setSettings={setSettings} />
          </div>

          {/* Generation settings like stack and model */}
          <GenerationSettings settings={settings} setSettings={setSettings} />

          {IS_RUNNING_ON_CLOUD && !settings.openAiApiKey && <OnboardingNote />}

          {appState === AppState.INITIAL && (
            <GenerateFromText doCreateFromText={doCreateFromText} />
          )}

          {/* Rest of the sidebar when we're not in the initial state */}
          {(appState === AppState.CODING ||
            appState === AppState.CODE_READY) && (
            <Sidebar
              showSelectAndEditFeature={showSelectAndEditFeature}
              doUpdate={doUpdate}
              regenerate={regenerate}
              cancelCodeGeneration={cancelCodeGeneration}
            />
          )}
        </div>
      </div>

      <main className="py-2 lg:pl-96">
        {appState === AppState.INITIAL && (
          <StartPane
            doCreate={doCreate}
            importFromCode={handleImportFromCode}
            settings={settings}
          />
        )}

        {(appState === AppState.CODING || appState === AppState.CODE_READY) && (
          <PreviewPane doUpdate={doUpdate} reset={reset} settings={settings} />
        )}
      </main>
    </div>
  );
}

export default App;