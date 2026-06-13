import React, { useEffect } from "react";

const MouseTrail = () => {
  useEffect(() => {
    const trail = [];
    const trailSize = 10;

    console.log("Initializing MouseTrail...");

    // Create trail elements
    for (let i = 0; i < trailSize; i++) {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.width = "10px";
      div.style.height = "10px";
      div.style.borderRadius = "50%";
      div.style.backgroundColor = "red";
      div.style.opacity = "1";
      div.style.zIndex = "99999";
      div.style.pointerEvents = "none";
      div.style.transform = "translate(-100px, -100px)";
      document.body.appendChild(div);
      trail.push(div);
      console.log(`Trail element ${i} created:`, div);
    }

    const handleMouseMove = (e) => {
      console.log("Mouse moved:", e.clientX, e.clientY);

      for (let i = trailSize - 1; i > 0; i--) {
        trail[i].style.transform = trail[i - 1].style.transform;
      }
      trail[0].style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      trail.forEach((div) => div.remove());
      console.log("Trail elements removed.");
    };
  }, []);

  return null;
};

export default MouseTrail;
