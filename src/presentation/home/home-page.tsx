"use client";
import React from "react";
import { useOurClient } from "@/data/api/user.hook";
import { DepartmentCard } from "./components/DepartmentCard";
import { useSummaryProcessor } from "./components/SummaryProcessor";

export const HomePage = () => {
  const { data, isLoading, error } = useOurClient();
  const summary = useSummaryProcessor(data?.users);

  if (isLoading) return <div>กำลังโหลด...</div>;
  if (error) return <div>เกิดข้อผิดพลาด: {(error as Error).message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">สรุปข้อมูลตามแผนก</h1>

      {Object.keys(summary).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(summary).map(([department, info]) => (
            <DepartmentCard
              key={department}
              department={department}
              info={info}
            />
          ))}
        </div>
      ) : (
        <p>ไม่พบข้อมูล</p>
      )}

      <div className="mt-4">
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(summary, null, 2)}
        </pre>
      </div>
    </div>
  );
};
