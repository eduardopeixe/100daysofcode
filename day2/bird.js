function Bird() {
    this.y = height / 2
    this.x = 45
    this.gravity = .6
    this.upForce = -10
    this.velocity = 0

    this.show = function () {

        ellipse(this.x, this.y, 32, 32)
    }

    this.update = function () {
        this.velocity += this.gravity
        this.velocity *= 0.9
        this.y += this.velocity

        if (this.y > height) {
            this.y = height
            this.velocity = 0
        }
        if (this.y < 0) {
            this.y = 0
            this.velocity = 0
        }
    }

    this.up = function () {
        this.velocity += this.upForce
    }
}