import { INSTITUTIONS_DATA, RESEARCHERS_DATA } from "../../lib/data";
import InstitutionSection from "../../components/InstitutionSection";

// Alphabetical so the scroll order matches what a visitor would expect
// (Claflin, then Clark Atlanta, etc.) regardless of how INSTITUTIONS_DATA
// itself is ordered.
const SORTED_INSTITUTIONS = [...INSTITUTIONS_DATA].sort((a, b) => a.name.localeCompare(b.name));

export default function InstitutionsPage() {
  return (
    <div className="w-full">
      {SORTED_INSTITUTIONS.map((institution) => (
        <InstitutionSection
          key={institution.id}
          institution={institution}
          researchers={RESEARCHERS_DATA.filter((r) => r.institution === institution.name)}
        />
      ))}
    </div>
  );
}
