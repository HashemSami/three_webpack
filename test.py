from timeit import default_timer as timer


class User:
    def __init__(self, first_name, last_name, age, occupation):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.occupation = occupation

    def describe_self(self):
        print(f"name{self.first_name} {self.last_name}")

    def show_strength(self):
        how_old = self.age
        output = "I am "
        while how_old > 0:
            output += "very "
            how_old -= 1

        return output + "strong"


individuals = []
for i in range(10000):
    person = User("Zay", "olag", i, "Economist")
    individuals.append(person)

# start_time = time.time()
start_time = timer()
print(len(individuals))


for p in individuals:
    # print(p.show_strength())
    p.show_strength()


# end_time = time.time()
end_time = timer()

execution_time = end_time - start_time
print(f"The execution time is: {execution_time}")
