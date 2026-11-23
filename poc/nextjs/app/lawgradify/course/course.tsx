"use client";
import { useEffect, useRef } from "react";
// The existing course engine and the law curriculum (kit/courses/law/, thousands of lines of notes as data) are NOT
// bundled: they're loaded at runtime from /kit/, exactly as the static page loads them, so the bundle stays small and
// the files stay shared with the old pages and the service worker's offline list.
export function Course() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let live = true;
    (async () => {
      const [{ mountCourse }, { default: course }] = await Promise.all([
        import(/* webpackIgnore: true */ "/kit/course/course.js" as string),
        import(/* webpackIgnore: true */ "/kit/courses/law/course.js" as string),
      ]);
      if (live && el.current) mountCourse(el.current, course);
    })();
    return () => { live = false; };
  }, []);
  return <div className="wrap"><div id="course" ref={el} /></div>;
}
