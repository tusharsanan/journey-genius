import { css } from "lit";

export const notificationStyles = css`
  .journey-notification {
    border: solid 2px;
    border-radius: 4px;
    padding: var(--space-4);
    margin-bottom: 0;
    margin-top: var(--space-3);
  }

  .journey-success-notification {
    border-color: var(--primary-color);
  }

  .journey-error-notification {
    border-color: var(--error-color);
  }

  .journey-warning-notification {
    border-color: var(--warning-color);
  }
`;
