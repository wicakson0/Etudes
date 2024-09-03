import sched, time

class Node:
    def __init__(self, name=None, func=None):
        self.name = name
        self.successor = []
        self.func = func
    
    def set_successor(self, obj_successor):
        self.successor.append(obj_successor)
    
    def set_name(self, name):
        self.name = name
        
    def set_func(self, func):
        self.func = func
        
    def execute(self):
        if self.func:
            self.func()

class Runner:
    def __init__(self, head):
        self.head = head
    
    def run(self):
        stack = [self.head]
        
        while stack:
            current = stack.pop()
            current.execute()
            
            for successor in reversed(current.successor):
                stack.append(successor)

def hello():
    print("hello")
    
def world():
    print("world!!!")

def main():
    say_hello = Node()
    say_hello.set_name("say hello")
    say_hello.set_func(hello)
    
    say_world = Node()
    say_world.set_name("say world")
    say_world.set_func(world)
    
    say_hello.set_successor(say_world)
    
    runner = Runner(say_hello)
    
    scheduler = sched.scheduler(time.time, time.sleep)
    scheduler.enter(5, 1, runner.run, ())
    scheduler.run()
    
    # runner.run()

if __name__ == "__main__":
    main()
