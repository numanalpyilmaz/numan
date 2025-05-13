document.addEventListener("DOMContentLoaded", () => {
    const car = document.querySelector("#car");
    const obstacle = document.querySelector("#obstacle");
    const scoreDisplay = document.querySelector("#score");

    let positionX = 175;
    let obstacleY = 0;
    let score = 0;
    let gameInterval;

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" && positionX > 50) {
            positionX -= 20;
        } else if (e.key === "ArrowRight" && positionX < 300) {
            positionX += 20;
        }
        car.style.left = `${positionX}px`;
    });

    function moveObstacle() {
        obstacleY += 10;
        obstacle.style.top = `${obstacleY}px`;

        if (obstacleY >= 300) {
            obstacleY = 0;
            obstacle.style.left = `${Math.random() * 350}px`;
            score++;
            scoreDisplay.textContent = score;
        }

        if (
            obstacleY >= 250 &&
            obstacle.offsetLeft >= car.offsetLeft - 40 &&
            obstacle.offsetLeft <= car.offsetLeft + 40
        ) {
            alert(`Oyun Bitti! Toplam Puanın: ${score}`);
            clearInterval(gameInterval);
        }
    }

    gameInterval = setInterval(moveObstacle, 100);
});
