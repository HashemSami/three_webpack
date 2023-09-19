from timeit import default_timer as timer


def show_strength(age):
    how_old = age
    output = "I am "
    while how_old > 0:
        output += "very "
        how_old -= 1

    return output + "strong"


def describe_self(first_name, last_name):
    print(f"name{first_name} {last_name}")


start_time = timer()

individuals = []
for i in range(10000):
    person = {
        "first_name": "Zay",
        "last_name": "olag",
        "age": i,
        "occupation": "Economist",
    }
    individuals.append(person)


for p in individuals:
    # print(show_strength(p["age"]))
    show_strength(p["age"])


end_time = timer()

execution_time = end_time - start_time
print(f"The execution time is: {execution_time}")
