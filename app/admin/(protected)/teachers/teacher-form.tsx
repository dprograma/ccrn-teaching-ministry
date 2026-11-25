import { saveTeacher } from "@/lib/actions/teachers";

export function TeacherForm({
  teacher,
}: {
  teacher?: { id: string; name: string; active: boolean };
}) {
  return (
    <form action={saveTeacher} className="space-y-5 max-w-xl">
      {teacher && <input type="hidden" name="id" value={teacher.id} />}

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">Name</label>
        <input
          name="name"
          required
          defaultValue={teacher?.name}
          className="w-full p-3 rounded-xl border border-line bg-card"
        />
      </div>

      <label className="flex items-center gap-2.5">
        <input type="checkbox" name="active" defaultChecked={teacher?.active ?? true} />
        <span className="text-[13.5px] font-semibold">
          Active (available for new talk assignments)
        </span>
      </label>

      <button
        type="submit"
        className="px-5 py-3 rounded-full bg-navy text-white font-semibold text-[14.5px]"
      >
        Save
      </button>
    </form>
  );
}
