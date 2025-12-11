const ArduinoTeachingPost = ({ isDarkMode }) => {
  return (
    <div className={`prose prose-lg max-w-none ${
      isDarkMode ? 'prose-invert' : ''
    }`}>
      {/* Introduction */}
      <section className="mb-12">
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          This paper examines the potential role of Arduino Micro-controllers as a significant tool
          for teaching 9th-grade students the concepts of electrical circuits, coding, sensor programming,
          as well as the engineering design process through practical activities.
        </p>
        
        <div className={`my-6 p-4 rounded-lg ${
          isDarkMode ? 'bg-purple-900/20 border-l-4 border-purple-500' : 'bg-purple-50 border-l-4 border-purple-600'
        }`}>
          <p className={`font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
            Key Finding
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            The participants of the study were high school students (n=16) and results from the study shows that 
            the practical activities were highly enjoyable by the students with a mean of 4.12 out of 5 (SD=0.81), 
            and most importantly using Arduino as a tool improved the students confidence in creating electric 
            circuits for innovative uses as their average confidence level rose from a pre-intervention level 
            (M=2.06, SD=1) to post-intervention level (M=2.62, SD=0.72).
          </p>
        </div>

        {/* SUGGESTED IMAGE PLACEMENT */}
        <div className={`my-8 p-6 border-2 border-dashed rounded-lg text-center ${
          isDarkMode ? 'border-gray-600 bg-gray-700/30' : 'border-gray-300 bg-gray-50'
        }`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            📸 SUGGESTED IMAGE: Classroom photo showing students working with Arduino projects
          </p>
        </div>
      </section>

      {/* Context Section */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          The Challenge: Bridging Theory and Practice
        </h2>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          Integrating hands-on projects into the high school engineering curriculum is an innovative way to
          increase student enrollment in engineering classes, pique their curiosity, and encourage technical
          creativity among students. Through these tangible projects, students are able to connect theoretical
          concepts with real-world innovations and their practical uses.
        </p>

        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          Most states require high school teachers to customize their course outline based on a laid-out 
          standard. For example, according to the Texas Essential Knowledge and Skills (TEKS), the
          Principles of Applied Engineering course must include content on electrical and mechanical systems, 
          as well as automation systems, thus it is every teacher's role to decide how theories can be 
          translated into hands-on lab activities in order to build students' confidence.
        </p>

        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          However, these state standards provide no guidance on how these TEKS can be taught through hands-on 
          activities, which are capable of improving the students' technical skills rather than learning the 
          abstract engineering concepts and calculations. Thus, teachers must independently design their 
          curriculum while integrating physical computing, and at the same time, considering the available 
          funds and student size.
        </p>
      </section>

      {/* Why Arduino Section */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Why Arduino Microcontrollers?
        </h2>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          Arduino microcontrollers could be the solution to teachers struggling to integrate physical computing
          into their curriculum, as they allow students to go beyond the theoretical concepts being
          taught, to learn how technological systems work, feel confident enough to make devices on their
          own, and, most importantly, give students a sense of satisfaction at the end of the school year.
        </p>

        <div className={`my-6 grid md:grid-cols-3 gap-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>Low-Cost</h4>
            <p className="text-sm">Affordable for school budgets and scalable across multiple students</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
            <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>Durable</h4>
            <p className="text-sm">Withstands classroom use and student experimentation</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
            <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Versatile</h4>
            <p className="text-sm">Supports Python and C++, adaptable to various skill levels</p>
          </div>
        </div>

        {/* SUGGESTED IMAGE PLACEMENT */}
        <div className={`my-8 p-6 border-2 border-dashed rounded-lg text-center ${
          isDarkMode ? 'border-gray-600 bg-gray-700/30' : 'border-gray-300 bg-gray-50'
        }`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            📸 SUGGESTED IMAGE: Arduino Uno board with basic components (LED, resistors, breadboard)
          </p>
        </div>
      </section>

      {/* Classroom Context */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Classroom Context
        </h2>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          The participants were mostly 9th graders with prior experience in blocks programming enrolled in
          the Principles of Applied Engineering course at Aggieland High School College Station in Texas.
          This course fully aligns with Texas Essential Knowledge and Skills (TEKS) and falls under the
          Career and Technical Education category. This course serves as a prerequisite for more advanced
          K-12 engineering courses such as Robotics I and II.
        </p>

        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          It should be noted that some students in this course are 11th graders who have taken multiple 
          computer science courses where programming was taught. However, all the students in this class 
          had limited knowledge of physical computing.
        </p>
      </section>

      {/* 12-Week Curriculum */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          The 12-Week Arduino Journey
        </h2>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          The teaching strategy used in this paper involves combining theoretical concepts alongside hands-on 
          learning, in incremental steps of complexity which culminated to a final project within after
          a 10 weeks period. A total of 6 individual in-class projects and 2 group projects of
          two members per group was conducted with the students over a period of 10 weeks before final
          capstone project given out.
        </p>

        {/* Project Roadmap Table */}
        <div className="my-8 overflow-x-auto">
          <table className={`w-full border-collapse ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <thead>
              <tr className={isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                <th className="border px-4 py-2 text-left">Week</th>
                <th className="border px-4 py-2 text-left">Project Name</th>
                <th className="border px-4 py-2 text-left">Type</th>
                <th className="border px-4 py-2 text-left">Main Components</th>
                <th className="border px-4 py-2 text-left">Skills Learned</th>
              </tr>
            </thead>
            <tbody>
              <tr className={isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2 font-medium">Blinking LED</td>
                <td className="border px-4 py-2">Individual</td>
                <td className="border px-4 py-2">LED, Resistor</td>
                <td className="border px-4 py-2">Basic circuits, digitalWrite(), variables</td>
              </tr>
              <tr className={isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                <td className="border px-4 py-2">2</td>
                <td className="border px-4 py-2 font-medium">Traffic Light Simulator</td>
                <td className="border px-4 py-2">Individual</td>
                <td className="border px-4 py-2">3 LEDs (R/Y/G)</td>
                <td className="border px-4 py-2">Sequencing, timing, delay(), conditionals</td>
              </tr>
              <tr className={isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                <td className="border px-4 py-2">3</td>
                <td className="border px-4 py-2 font-medium">LCD Display</td>
                <td className="border px-4 py-2">Individual</td>
                <td className="border px-4 py-2">LCD Screen</td>
                <td className="border px-4 py-2">I2C communication, libraries</td>
              </tr>
              <tr className={isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                <td className="border px-4 py-2">4</td>
                <td className="border px-4 py-2 font-medium">Distance Meter</td>
                <td className="border px-4 py-2">Individual</td>
                <td className="border px-4 py-2">Ultrasonic Sensor</td>
                <td className="border px-4 py-2">pulseIn(), distance calculation, Serial Monitor</td>
              </tr>
              <tr className={isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                <td className="border px-4 py-2">5</td>
                <td className="border px-4 py-2 font-medium">Proximity Alert System</td>
                <td className="border px-4 py-2">Individual</td>
                <td className="border px-4 py-2">Ultrasonic + LED</td>
                <td className="border px-4 py-2">Threshold logic, feedback</td>
              </tr>
              <tr className={isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                <td className="border px-4 py-2">6</td>
                <td className="border px-4 py-2 font-medium">Servo Controller</td>
                <td className="border px-4 py-2">Individual</td>
                <td className="border px-4 py-2">Servo SG90</td>
                <td className="border px-4 py-2">PWM, servo library</td>
              </tr>
              <tr className={isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                <td className="border px-4 py-2">7</td>
                <td className="border px-4 py-2 font-medium">Smart Display System</td>
                <td className="border px-4 py-2">Group</td>
                <td className="border px-4 py-2">LCD + Ultrasonic</td>
                <td className="border px-4 py-2">Multi-component integration</td>
              </tr>
              <tr className={isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                <td className="border px-4 py-2">8</td>
                <td className="border px-4 py-2 font-medium">Automatic Door</td>
                <td className="border px-4 py-2">Group</td>
                <td className="border px-4 py-2">Servo + Ultrasonic</td>
                <td className="border px-4 py-2">Sensor-actuator systems</td>
              </tr>
              <tr className={`${isDarkMode ? 'bg-purple-900/30 hover:bg-purple-900/40' : 'bg-purple-50 hover:bg-purple-100'}`}>
                <td className="border px-4 py-2 font-bold">11-12</td>
                <td className="border px-4 py-2 font-bold">Capstone Project</td>
                <td className="border px-4 py-2">Group</td>
                <td className="border px-4 py-2">Servo + LCD + Ultrasonic + LEDs</td>
                <td className="border px-4 py-2 font-medium">Full system design</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SUGGESTED IMAGE PLACEMENT */}
        <div className={`my-8 p-6 border-2 border-dashed rounded-lg text-center ${
          isDarkMode ? 'border-gray-600 bg-gray-700/30' : 'border-gray-300 bg-gray-50'
        }`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            📸 SUGGESTED IMAGE: Collage showing progression from Week 1 (simple LED) to Week 8 (complex system)
          </p>
        </div>
      </section>

      {/* Capstone Project */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          The Capstone Project: Bringing It All Together
        </h2>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          The main goal of this capstone project was to test students understanding of circuitry, programming,
          code debugging, design process, and most importantly to understand the students perception
          on how they could relate their hands-on projects to real life innovations.
        </p>

        <div className={`my-6 p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
          <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
            Project Requirements
          </h3>
          <ol className={`list-decimal list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>Create an Arduino based system based on real life innovations seen in everyday life.</li>
            <li>The prototype must include a contactless opening and closing functionality.</li>
            <li>The system must include 4 main components: Arduino Uno R3, LCD screen, SG90 Servo, and Ultrasound distance sensor.</li>
          </ol>
        </div>

        <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Scaffolding Student Success
        </h3>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          In order to support the students capstone project while maintaining some level of challenge, the
          students were provided with multiple circuit diagrams and a starter source code that needed some
          minor debugging. These were shared via Tinkercad online simulator, and the students were
          allowed to copy, customize the circuit to fit their own projects.
        </p>

        {/* SUGGESTED IMAGE PLACEMENT - Circuit Diagrams */}
        <div className={`my-8 p-6 border-2 border-dashed rounded-lg text-center ${
          isDarkMode ? 'border-gray-600 bg-gray-700/30' : 'border-gray-300 bg-gray-50'
        }`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            📸 SUGGESTED IMAGE: Circuit diagrams showing Arduino + LCD, Arduino + Ultrasonic, Arduino + Servo
            <br />
            (From PDF Figure 1: Circuit diagrams provided to support the students capstone project)
          </p>
        </div>

        <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Student Creativity Unleashed
        </h3>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          The capstone project encouraged the students to form their unique design, and to make decisions 
          about real world application they want to model real world innovations that appeals to them
          and showed creative use of the concepts learned in class to what they see in their everyday life.
        </p>

        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          Some of the students projects included an automatic door that opens automatically when a person is
          nearby, another student created a two door system that opens up automatically, and even a robotic
          alligator mouth model. Each of these project where all unique in their own ways but followed the
          sensor-servo driven logic to their designs.
        </p>

        {/* SUGGESTED IMAGE PLACEMENT - Student Projects */}
        <div className={`my-8 p-6 border-2 border-dashed rounded-lg text-center ${
          isDarkMode ? 'border-gray-600 bg-gray-700/30' : 'border-gray-300 bg-gray-50'
        }`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            📸 SUGGESTED IMAGE: Student projects grid showing:
            <br />
            - Teacher's Exemplar (Smart Bin)
            <br />
            - Automatic Door project
            <br />
            - Sport Car Hood project
            <br />
            - Robotic Alligator project
            <br />
            - Smart Bin project
            <br />
            (From PDF Figure 2: Sample students capstone project compared with teachers exemplar)
          </p>
        </div>
      </section>

      {/* Results Section */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          What the Data Revealed
        </h2>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          The final result from the analysis showed considerable learning outcomes: Survey responses
          showed very strong engagement as 78% of the students rated the Arduino activities a 4 or 5 on
          a 5-point scale (M = 4.14). Post-activity confidence after the capstone project showed that 64.3%
          of the students reported feeling "Confident" or "Very Confident" with their technical skills (M =
          2.64) while 60% of the students who rated their prior experience or confidence as a 1 or 2 reported
          a higher level of confidence in working with circuits (M = 2.14).
        </p>

        {/* SUGGESTED IMAGE PLACEMENT - Survey Results */}
        <div className={`my-8 p-6 border-2 border-dashed rounded-lg text-center ${
          isDarkMode ? 'border-gray-600 bg-gray-700/30' : 'border-gray-300 bg-gray-50'
        }`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            📸 SUGGESTED IMAGE: Bar charts showing:
            <br />
            - Q1: Prior Familiarity with Arduino (Before)
            <br />
            - Q2: Confidence After Activity
            <br />
            - Q3: Enjoyment of Hands-on Arduino Activity
            <br />
            (From PDF Figure 3: Thematic Distribution of Student Responses)
          </p>
        </div>

        <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Student Voices: Helpful vs. Challenging
        </h3>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          Thematic analysis of the open ended questions revealed some patterns on activities students really
          loved or they found to be very useful. It also revealed those activities the students found to be very
          challenging during the hands-on projects.
        </p>

        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          Regarding challenges, a majority of the students found coding and debugging to be the most
          challenging task followed by building the non circuit component which required the students to
          formulate their own design. The prevalence of debugging as a challenge is very significant, the 3
          student overlap between debugging and circuit is common issue amongst novice learners of physical computing where errors could have resulted from the code or poor circuit connections.
        </p>

        {/* SUGGESTED IMAGE PLACEMENT - Thematic Analysis */}
        <div className={`my-8 p-6 border-2 border-dashed rounded-lg text-center ${
          isDarkMode ? 'border-gray-600 bg-gray-700/30' : 'border-gray-300 bg-gray-50'
        }`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            📸 SUGGESTED IMAGE: Heat maps showing:
            <br />
            - Q4: What Helped Most (Coding, Building, Circuit, Sensors, Debugging)
            <br />
            - Q5: Challenges Faced (Coding, Building, Circuit, Sensors, Debugging)
            <br />
            (From PDF Figure 5: Thematic Distribution of Student Responses)
          </p>
        </div>
      </section>

      {/* Key Insights */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Key Insights from the Classroom
        </h2>
        
        <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          The Paradox of "Desirable Difficulties"
        </h3>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          An important paradox found in the thematic analysis was Arduino coding's appearance as both
          helpful (n=5) and challenging (n=8), this is not contradictory in itself but describes a situation
          known as desirable-difficulties which (Bjork & Bjork, 2020) described as desirable because "they
          trigger encoding and retrieval processes that support learning, comprehension, and remembering"
          (p. 3). This finding suggests that scaffolded Arduino based curriculum and instructions places
          tasks within an optimal Zone of Proximal Development.
        </p>

        <div className={`my-6 p-4 rounded-lg ${
          isDarkMode ? 'bg-green-900/20 border-l-4 border-green-500' : 'bg-green-50 border-l-4 border-green-600'
        }`}>
          <p className={`font-semibold mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
            Teaching Takeaway
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            When students find something both helpful AND challenging, that's actually a sign you're hitting 
            the sweet spot of learning. The struggle is part of the process.
          </p>
        </div>

        <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          The Hardware-Software Connection Challenge
        </h3>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          A striking pattern was also observed in the thematic analysis includes the strong concurrence of 
          coding and debugging challenges (n=7, 87.5% of coding difficulties). Physical computing requires 
          collective reasoning across the hardware and software components, unlike pure coding task where 
          the errors purely logical.
        </p>

        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          During my walk around, I observe that majority of the debuggings done by the students were
          mostly from the circuit wirings misalignment, with very few from the actual code itself. This
          finding has a significant implication for instruction, as educators need to integrate the concept of
          debugging into every Arduino project starting from the very first.
        </p>

        <h3 className={`text-2xl font-bold mb-4 mt-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Physical Beats Virtual
        </h3>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          Finally, only one student mentioned Tinkercad simulations to be helpful despite every students
          using it during classroom instruction and for planning out the circuits for any inclass project, this
          probably means that majority of the students prefers tangible feedback over online simulations. A
          second possible reason could be that Tinkercad does not fully capture the intricacies of creating
          a physical circuit. Future research may focus on the impact of simulations tools on the learning
          outcomes of physical computing students.
        </p>
      </section>

      {/* Connecting to Bigger Picture */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Why This Matters: Identity and Interest
        </h2>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          The versatility and durability of Arduinos for various kinds of projects makes them appealing to
          both novice learners and advanced tinkerers. Student who enroll in engineering courses do so with
          the hopes to start building things immediately especially if it is a creation that connects with their
          interest - a connection which could boost their feeling of self satisfaction and technical confidence.
        </p>

        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          (Roque, 2020) found that students developed computing identities when they could "connect what
          they valued to aspects of their experience and see themselves as creators with computing" (p. 210).
          This was observed in one of my student who modeled his capstone project after a car trunk lid that
          opens automatically when approached, thus allowing him to express his interest for automobiles
          and everyday convenience through Arduino controlled servos and sensors.
        </p>

        {/* SUGGESTED IMAGE PLACEMENT - Car Hood Project */}
        <div className={`my-8 p-6 border-2 border-dashed rounded-lg text-center ${
          isDarkMode ? 'border-gray-600 bg-gray-700/30' : 'border-gray-300 bg-gray-50'
        }`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            📸 SUGGESTED IMAGE: Close-up of the "Sport Car Hood" student project showing the student's
            <br />
            connection between their automotive interests and the Arduino system
          </p>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Looking Forward
        </h2>
        
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          The studies shows that Arduino's can be a very powerful tool for introducing high school students 
          to the concept of circuitry, coding, and the engineering design process. By carefully scaffolding 
          projects over 12 weeks, providing support materials while maintaining appropriate challenge levels, 
          and allowing students to connect projects to their personal interests, we can build both technical 
          confidence and engineering identity in our students.
        </p>

        <div className={`my-6 p-6 rounded-lg ${isDarkMode ? 'bg-gray-700 border-l-4 border-purple-500' : 'bg-purple-50 border-l-4 border-purple-600'}`}>
          <p className={`font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
            For Educators
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            If you're considering implementing Arduino in your classroom, remember: start simple, scaffold 
            deliberately, embrace the debugging process as a teaching moment, and most importantly, let 
            students connect their projects to what matters to them.
          </p>
        </div>
      </section>

      {/* References Note */}
      <section className={`mt-12 pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <p className={`text-sm italic ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          This blog post is based on research conducted at Aggieland High School, College Station, Texas.
          Full citations and methodology details are available in the complete research paper.
        </p>
      </section>
    </div>
  );
};

export default ArduinoTeachingPost;
