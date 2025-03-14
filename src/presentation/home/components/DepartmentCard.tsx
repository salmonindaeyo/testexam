import React from "react";
import { DepartmentInfo } from "@/data/domain/users.domain";

interface DepartmentCardProps {
  department: string;
  info: DepartmentInfo;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({
  department,
  info,
}) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">{department}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium">จำนวนตามเพศ</h3>
          <p>ชาย: {info.male}</p>
          <p>หญิง: {info.female}</p>
        </div>

        <div>
          <h3 className="font-medium">ช่วงอายุ</h3>
          <p>{info.ageRange}</p>
        </div>

        <div>
          <h3 className="font-medium">สีผม</h3>
          <ul>
            {Object.entries(info.hair).map(([color, count]) => (
              <li key={color}>
                {color}: {count}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium">รหัสไปรษณีย์ของผู้ใช้</h3>
          <ul>
            {Object.entries(info.addressUser).map(([name, postalCode]) => (
              <li key={name}>
                {name}: {postalCode}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
