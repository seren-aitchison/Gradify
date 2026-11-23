import { Course } from "./course";
export const metadata = { title: "LawGradify · Law course" };
// the same kit stylesheets, in the same order, as lawgradify/course/index.html (parity.cjs checks they match).
// `precedence` makes React put them in <head> after the layout's, so the engine's own ui.css still lands last, as it does there.
export default function Page() { return <><link rel="stylesheet" href="/kit/styles/components.css" precedence="course" /><link rel="stylesheet" href="/kit/styles/subsite.css" precedence="course" /><link rel="stylesheet" href="/kit/styles/model.css" precedence="course" /><link rel="stylesheet" href="/kit/styles/course.css" precedence="course" /><Course /></>; }
