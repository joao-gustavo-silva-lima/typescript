export class GradeSchool {
  private grades : Record<number, string[]> = {};

  public readonly roster = () : Record<number, string[]> => 
    Object.keys(this.grades)
    .sort()
    .map(Number)
    .reduce(
      (obj, key) => { obj[key] = [...this.grades[key]]; return obj; }, 
      {} as Record<number, string[]>
    );

  public readonly grade = (grade : number) : string[] => 
    [...(this.grades[grade] ?? [])]

  public add(studentName : string, hostGrade : number) : void {
    Object.keys(this.grades)
    .map(Number)
    .forEach(
      grade => this.grades[grade] = this.grades[grade].filter(existentStudentName => existentStudentName != studentName));

    this.grades[hostGrade] = [...(this.grades[hostGrade] ?? []), studentName]
      .sort()
  }
}
