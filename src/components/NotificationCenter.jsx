import { useEffect, useRef, useState } from "react";

const TYPE_STYLES = {
  success: {
    accent: "#00C853",
    icon: "✓",
    role: "status",
  },
  warning: {
    accent: "#FFB300",
    icon: "!",
    role: "status",
  },
  error: {
    accent: "#FF5252",
    icon: "×",
    role: "alert",
  },
  info: {
    accent: "#58A6FF",
    icon: "i",
    role: "status",
  },
};

const AUTO_DISMISS_MS = 4500;

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const timersRef = useRef(new Map());
  const nextIdRef = useRef(1);

  useEffect(() => {
    const timers = timersRef.current;

    const removeNotification = (id) => {
      setNotifications((current) =>
        current.filter((notification) => notification.id !== id)
      );

      const timer = timers.get(id);

      if (timer) {
        window.clearTimeout(timer);
        timers.delete(id);
      }
    };

    const handleNotify = (event) => {
      const detail = event?.detail ?? {};
      const message = String(detail.message ?? "").trim();

      if (!message) return;

      const type = Object.prototype.hasOwnProperty.call(
        TYPE_STYLES,
        detail.type
      )
        ? detail.type
        : "info";

      const id = nextIdRef.current++;

      setNotifications((current) => [
        ...current.slice(-3),
        {
          id,
          type,
          message,
        },
      ]);

      const timer = window.setTimeout(() => {
        removeNotification(id);
      }, AUTO_DISMISS_MS);

      timers.set(id, timer);
    };

    window.addEventListener("tradeai:notify", handleNotify);

    return () => {
      window.removeEventListener("tradeai:notify", handleNotify);

      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });

      timers.clear();
    };
  }, []);

  const dismiss = (id) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );

    const timer = timersRef.current.get(id);

    if (timer) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div
      aria-label="Notifications"
      style={{
        position: "fixed",
        top: "calc(76px + env(safe-area-inset-top, 0px))",
        right: 16,
        zIndex: 1360,
        width: "min(380px, calc(100vw - 32px))",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        pointerEvents: "none",
      }}
    >
      {notifications.map((notification) => {
        const config =
          TYPE_STYLES[notification.type] ?? TYPE_STYLES.info;

        return (
          <div
            key={notification.id}
            role={config.role}
            aria-live={
              notification.type === "error"
                ? "assertive"
                : "polite"
            }
            style={{
              pointerEvents: "auto",
              display: "grid",
              gridTemplateColumns: "32px minmax(0, 1fr) 32px",
              alignItems: "center",
              gap: 10,
              padding: "12px 12px",
              borderRadius: 12,
              border: `1px solid ${config.accent}66`,
              borderLeft: `4px solid ${config.accent}`,
              background: "rgba(22, 27, 34, 0.97)",
              color: "#E6EDF3",
              boxShadow: "0 14px 40px rgba(0, 0, 0, 0.45)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${config.accent}22`,
                color: config.accent,
                fontWeight: 900,
              }}
            >
              {config.icon}
            </span>

            <span
              style={{
                minWidth: 0,
                fontSize: 14,
                lineHeight: 1.45,
                fontWeight: 650,
                overflowWrap: "anywhere",
              }}
            >
              {notification.message}
            </span>

            <button
              type="button"
              onClick={() => dismiss(notification.id)}
              aria-label="Fermer la notification"
              style={{
                width: 32,
                height: 32,
                minWidth: 32,
                border: 0,
                borderRadius: 8,
                background: "transparent",
                color: "#8B949E",
                cursor: "pointer",
                fontSize: 20,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
