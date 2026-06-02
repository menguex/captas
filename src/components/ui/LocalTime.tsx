"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("es-CL", {
  timeZone: "America/Santiago",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function LocalTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <span>Ovalle, CL</span>;

  return <span>Ovalle, CL — {time}</span>;
}
