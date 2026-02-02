"use client";

import { CourseViewer } from "@/container";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EduCourse() {
  const router = useRouter();
  const { id } = router.query;

  // Keep behavior consistent with other pages: ensure LocomotiveScroll is available.
  useEffect(() => {}, []);

  return (
    <>
      <CourseViewer courseId={id as string} />
    </>
  );
}
