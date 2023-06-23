import { useDispatch, useSelector } from '@sz/stores';

export function usePaid() {
  const isPaid = useSelector(state => state.persistentUserStore.isPaid);

  const dispatch = useDispatch();

  /**
   * @returns the action passed as a parameter if the user is a paid user, if not returns the function to show the upgrade modal
   */
  const restrictPaidAction = (action: () => void) => {
    if (isPaid) {
      return action;
    } else {
      return () => dispatch.appStore.setUpgradeModalVisible(true);
    }
  };

  return { isPaid, restrictPaidAction };
}
