
import { useScreenState, ScreenStateType } from "@/hooks/useScreenState";
import useMoodState from "@/hooks/useMoodState";
import useRegistrationState from "@/hooks/useRegistrationState";
import useSubscriptionState from "@/hooks/useSubscriptionState";
import useVisionBoardState from "@/hooks/useVisionBoardState";
import useFirstVisitState from "@/hooks/useFirstVisitState";

export const useIndexState = () => {
  // Get all the hooks
  const { screenState, setScreenState } = useScreenState();
  const { selectedMood, handleMoodSelect } = useMoodState();
  const { userInfo, isSpanish, isPortuguese, handleUserInfoChange, handleRegister } = useRegistrationState();
  const { selectedPlan, selectedAddOns, handleSubscriptionSelect, toggleAddOn, handleSubscriptionContinue, handleAddOnsContinue } = useSubscriptionState();
  const { selectedQualities, selectedGoals, toggleQuality, toggleGoal, handleVisionBoardContinue } = useVisionBoardState();
  const { isFirstVisit, setIsFirstVisit } = useFirstVisitState(screenState);

  // Wrapper functions to handle screen state transitions
  const handleMoodSelectWrapper = (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => {
    console.log(`[useIndexState] Selecting mood: ${mood} and transitioning to moodResponse screen`);
    handleMoodSelect(mood);
    // Transition to the next screen after mood selection
    setScreenState('moodResponse');
  };

  const handleRegisterWrapper = (e: React.FormEvent) => {
    handleRegister(e, () => setScreenState('subscription'));
  };

  const handleSubscriptionContinueWrapper = () => {
    handleSubscriptionContinue(() => setScreenState('subscriptionAddOns'));
  };

  const handleAddOnsContinueWrapper = () => {
    handleAddOnsContinue(() => setScreenState('visionBoard'));
  };

  const handleVisionBoardContinueWrapper = () => {
    handleVisionBoardContinue(() => setScreenState('main'));
  };

  // Return all the state and handlers
  return {
    screenState,
    setScreenState,
    selectedMood,
    userInfo,
    selectedPlan,
    selectedAddOns,
    selectedQualities,
    selectedGoals,
    isFirstVisit,
    setIsFirstVisit,
    isSpanish,
    isPortuguese,
    handleUserInfoChange,
    handleRegister: handleRegisterWrapper,
    handleSubscriptionSelect,
    toggleQuality,
    toggleGoal,
    toggleAddOn,
    handleSubscriptionContinue: handleSubscriptionContinueWrapper,
    handleAddOnsContinue: handleAddOnsContinueWrapper,
    handleVisionBoardContinue: handleVisionBoardContinueWrapper,
    handleMoodSelect: handleMoodSelectWrapper
  };
};

export default useIndexState;
