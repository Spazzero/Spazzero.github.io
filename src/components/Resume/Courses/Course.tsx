import type { Course as CourseType } from '@/data/resume/courses';

interface CourseProps {
  data: CourseType;
}

export default function Course({ data }: CourseProps) {
  // `number` and `link` are optional: coursework listed by name only would
  // otherwise render a bare ":" and an anchor pointing nowhere.
  const body = (
    <>
      {data.number ? (
        <span className="course-number">{data.number}:</span>
      ) : null}
      <span className="course-name">{data.title}</span>
    </>
  );

  return (
    <li className="course-container">
      {data.link ? <a href={data.link}>{body}</a> : body}
    </li>
  );
}
