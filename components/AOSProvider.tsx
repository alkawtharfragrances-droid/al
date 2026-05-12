"use client";

import AOS from "aos";
import { useEffect } from "react";

export default function AOSProvider() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return null;
}