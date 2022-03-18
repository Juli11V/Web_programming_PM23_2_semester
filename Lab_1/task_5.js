// Написати функцію, яка поверне кількість днів для заданого місяця та року.
let year = 2022;
let month = 2;
let nDays = 31 ;
let f_leap_year = true

if(year % 400 == 0){
    console.log(`${year} - високосний рік`)
}else
    if(year % 100 == 0){
        console.log(`${year} - не високосний рік`)
        f_leap_year = false;
    }else
         if(year % 4 == 0){
             console.log(`${year} -  високосний рік`)
             f_leap_year = false;
          }else {
             console.log(`${year} - не високосний рік`)
             f_leap_year = false;
         }

   if(month == 2 && f_leap_year == true){ nDays = 29}
   else if(month == 2 && f_leap_year == false){ nDays = 28}
   else if(month == 4 || month == 6 || month == 9 || month == 11 ){ nDays = 30}

   console.log(`Кількість днів у  ${year} році  місяця(${month}) : ${nDays}`);