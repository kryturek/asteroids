# Asteroids

This p5.js project, named "Asteroids," is an interactive simulation involving various entities such as asteroids, attractors, repellers, and boulders. Users can manipulate these entities using the mouse and keyboard, creating a dynamic and engaging experience.

## Table of Contents

-  [Getting Started](#getting-started)
-  [Features](#features)
-  [Controls](#controls)
-  [Entities](#entities)
-  [Dependencies](#dependencies)
-  [Troubleshooting](#troubleshooting)
-  [Contributing](#contributing)
-  [License](#license)

## Getting Started

### Prerequisites

Ensure you have a modern web browser that supports JavaScript.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/kryturek/asteroids.git
   ```
2. Navigate to the project directory:
   ```sh
   cd asteroids/app
   ```
3. Open `index.html` in your web browser to start the simulation.

Alternatively, you can view the live version of the project [here](https://kryturek.github.io/asteroids/app/).

## Features

-  **Attractors**: Exude positive gravitational force, attracting asteroids.
-  **Repellers**: Exude negative gravitational force, repelling asteroids.
-  **Boulders**: Static obstacles that cause asteroids to bounce off and lose velocity.
-  **Asteroids**: Dynamic entities that interact with attractors, repellers, and boulders. They can consume smaller asteroids when collided.
-  **Background**: Simulated night sky with tiny, barely visible pellets moving using Perlin noise.

## Controls

### Mouse Controls

-  **Left Click**: Add a new asteroid at the mouse position.
-  **Right Click**/**Backspace** */: Delete entities (movers, attractors, repellers, or boulders) under the mouse cursor.
-  **Mouse Wheel**: Change the gravitational constant `G`.

### Keyboard Controls

-  **A**: Add a new attractor at the mouse position.
-  **R**: Add a new repeller at the mouse position.
-  **B**: Add a new boulder at the mouse position.
-  **C**: Toggle constraint of entities within the canvas.
-  **P**: Pause/resume the simulation.
-  **H**: Show/hide help.
-  **F**: Toggle fullscreen mode.

## Entities

### Red Attractor

-  **Description**: Exudes positive gravitational force, attracting asteroids.
-  **Behavior**: Asteroids can fall into an attractor, simulating a 'black hole'.

### Blue Repeller

-  **Description**: Exudes negative gravitational force, repelling asteroids.
-  **Behavior**: Repellers can split asteroids that have fallen into attractors, simulating a 'white hole'.

### Gray Boulder

-  **Description**: Static obstacle.
-  **Behavior**: Asteroids bounce off boulders and lose velocity.

### Asteroid

-  **Description**: The only moving entity.
-  **Behavior**:
   -  When collided with another asteroid, and if there's a significant difference in sizes, the bigger asteroid will 'consume' the other one, growing in size.
   -  Interacts with attractors, repellers, and boulders.

## Dependencies

-  [p5.js](https://p5js.org/): A JavaScript library that makes coding accessible for artists, designers, educators, and beginners.

## Troubleshooting

If the simulation doesn't respond to inputs or behaves unexpectedly, try the following steps:

1. Ensure you are using a modern, up-to-date web browser. I use Opera extensively but it doesn't seem to work well with p5.js yet.
2. Check the browser console for any error messages and address them accordingly.
3. Refresh the page to reset the simulation.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on the [GitHub repository](https://github.com/kryturek/asteroids).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
