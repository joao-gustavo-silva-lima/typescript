export class GradeSchool {
  private grades : Record<number, string[]> = {};

  public readonly roster = () : Record<number, string[]> => 
    Object.keys({...this.grades})
    .sort()
    .map(Number)
    .reduce(
      (obj, key) => { obj[key] = [...this.grades[key]]; return obj; }, 
      {} as Record<number, string[]>
    );

  public readonly grade = (grade : number) : string[] => 
    this.grades[grade] ? [...this.grades[grade]] : [];

  public add(studentName : string, hostGrade : number) : void {
    this.dry(studentName);

    this.grades[hostGrade] = hostGrade in this.grades
      ? [...this.grades[hostGrade], studentName].sort()
      : [studentName];
  }

  private dry(studentName : string) : void {
    for(let grade of Object.keys(this.grades).map(Number)) {
      if(!this.grades[grade].includes(studentName)) continue;

      this.remove(studentName, grade);
    }
  }

  private remove(studentName : string, grade : number) : void {
    const removalIndex = this.grades[grade].indexOf(studentName);

    this.grades[grade].splice(removalIndex, 1);
  }
}
