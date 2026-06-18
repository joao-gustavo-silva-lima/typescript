export class GradeSchool {
  private readonly studentsRecord = new Map<string, number>();

  private grades : Record<number, string[]> = {};

  public readonly roster = () : Record<number, string[]> => 
    Object.keys(this.grades)
    .map(Number)
    .sort()
    .reduce(
      (obj, key) => {
        obj[key] = [...this.grades[key]];
        return obj;
      }, 
      {} as Record<number, string[]>
    );

  public readonly grade = (grade : number) : string[] => 
    [...(this.grades[grade] ?? [])]

  public add(studentName : string, hostGrade : number) : void {
    this.preventRecordDuplication(studentName);

    this.grades[hostGrade] = [...(this.grades[hostGrade] ?? []), studentName]
      .sort();

    this.studentsRecord.set(studentName, hostGrade);
  }

  private preventRecordDuplication(studentName : string) : void {
    const studentGrade = this.studentsRecord.get(studentName);

    if(studentGrade === undefined) return;

    this.grades[studentGrade] = this.grades[studentGrade].filter(
      (_studentName, _) => _studentName != studentName);
  }
}
