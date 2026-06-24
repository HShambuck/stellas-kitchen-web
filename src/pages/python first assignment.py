print("STUDENT GPA CALCULATOR")
print("Make Sure You Follow Every Instruction!")
#Take Student Name
first_name = str(input("Enter Your First Name: "))
surname = str(input("Enter Your Surname: "))
print(f"Welcome {first_name}!")

#Take Course Name, Scores, And Credit Hours
scores = []
credit_hours = []
grade_points = []
# Take Information 5 Times And Handle Errors
for i in range(5):
    course_name = str(input("Enter your course name: "))

    score = float(input(f"Enter the score for {course_name}: "))
    if score < 0 or score > 100:
      print("Error, score must be between 0 and 100")
      break

    credit = float(input("Enter the credit hours: "))
    if credit < 0 or credit > 3:
      print("Error, credit hours must be between 0 and 4")
      break
    
    scores.append(score)
    credit_hours.append(credit)

#Convert Scores To GPA
    if score >= 80:
       point = 4.0
    elif score >= 75:
       point = 3.5
    elif score >= 70:
       point = 3.0
    elif score >= 65:
       point = 2.5
    elif score >= 60:
       point = 2.0
    elif score >= 55:
       point = 1.5
    elif score >= 50:
       point = 1.0
    elif score >= 45:
       point = 0.5
    else:
       point = 0.0

    grade_points.append(point)

total = 0
for i in range(len(scores)):
   total += grade_points[i]*credit_hours[i]

#Calculate Weighted GPA
weighted_gpa = total/ (sum(credit_hours))

#Calculate Grade
if weighted_gpa >= 3.50 and weighted_gpa <= 4.00:
   print("You Got Grade A")
elif weighted_gpa >= 3.00 and weighted_gpa <= 3.49:
    print("You Got Grade B")
elif weighted_gpa >= 2.50 and weighted_gpa <= 2.99:
   print("You Got Grade C")
elif weighted_gpa >= 2.00 and weighted_gpa <= 2.49:
   print("You Got Grade D")
else:
   print("You Got Grade F")

#Display These Details
print(f"Your scores are: {scores}")
print(f"Your weighted GPA is: {weighted_gpa:.2f}")
print(f"Your Grade Points Are: {grade_points}")