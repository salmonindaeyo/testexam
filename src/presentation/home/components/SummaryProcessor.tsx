import { User, DepartmentSummary } from "@/data/domain/users.domain";
import { useEffect, useState } from "react";

export const useSummaryProcessor = (users: User[] | undefined) => {
  const [summary, setSummary] = useState<DepartmentSummary>({});

  useEffect(() => {
    if (!users) return;

    const departmentSummary: DepartmentSummary = {};

    users.forEach((user: User) => {
      const department = user.company.department;
      const fullName = `${user.firstName}${user.lastName}`;
      const postalCode = user.address.postalCode;
      const hairColor = user.hair.color;
      const gender = user.gender.toLowerCase();
      const age = user.age;

      // Initialize department if not exists
      if (!departmentSummary[department]) {
        departmentSummary[department] = {
          male: 0,
          female: 0,
          ageRange: `${age}-${age}`,
          hair: {},
          addressUser: {},
        };
      }

      if (gender === "male") {
        departmentSummary[department].male += 1;
      } else if (gender === "female") {
        departmentSummary[department].female += 1;
      }

      if (!departmentSummary[department].hair[hairColor]) {
        departmentSummary[department].hair[hairColor] = 0;
      }
      departmentSummary[department].hair[hairColor] += 1;

      departmentSummary[department].addressUser[fullName] = postalCode;

      const currentRange = departmentSummary[department].ageRange;
      const [minAge, maxAge] = currentRange.split("-").map(Number);

      if (age < minAge) {
        departmentSummary[department].ageRange = `${age}-${maxAge}`;
      } else if (age > maxAge) {
        departmentSummary[department].ageRange = `${minAge}-${age}`;
      }
    });

    setSummary(departmentSummary);
  }, [users]);

  return summary;
};
