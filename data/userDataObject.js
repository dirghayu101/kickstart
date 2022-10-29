const userData = {
    dashboard: {
        mainBody: ``,
        script: `<script>document.querySelector('.dashboard').classList.add('active')</script>`
    },
    spaces: {
        mainBody: `<h1 id="bookHeading">Book Your Space</h1>
        <div class="outer-box">
            <div class="space">
                <div class="image-box">
                    <img src="/assets/user-panel/catalogue/conferenceRoom.webp" class="space-image">
                </div>
                <div class="space-info">
                    <h2>Conference Room</h2>
                    <p>For ₹2000 per hour.</p>
                    <button class="book-btn">Book Now</button>
                </div>
            </div>
            <div class="space">
                <div class="image-box">
                    <img src="/assets/user-panel/catalogue/privateOffice.webp" class="space-image">
                </div>
                <div class="space-info">
                    <h2>Private Office</h2>
                    <p>From ₹27,000 per month.</p>
                    <button class="book-btn">Book Now</button>
                </div>
            </div>
            <div class="space">
                <div class="image-box">
                    <img src="/assets/user-panel/catalogue/hotSeat.webp" class="space-image">
                </div>
                <div class="space-info">
                    <h2>Hot Seat</h2>
                    <p>From ₹18,000 per month</p>
                    <button class="book-btn">Book Now</button>
                </div>
            </div>
            <div class="space">
                <div class="image-box">
                    <img src="/assets/user-panel/catalogue/cubicle.webp" class="space-image">
                </div>
                <div class="space-info">
                    <h2>Cubicle</h2>
                    <p>From ₹12,000 per month.</p>
                    <button class="book-btn">Book Now</button>
                </div>
            </div>
        </div>`,
        script: `<script>document.querySelector('.spaces').classList.add('active')</script>`
    },
    orders: {
        mainBody: ``,
        script: `<script>document.querySelector('.orders').classList.add('active')</script>`
    },
    feedback: {
        mainBody: ``,
        script: `<script>document.querySelector('.feedback').classList.add('active')</script>`
    },
    support: {
        mainBody: ``,
        script: `<script>document.querySelector('.support').classList.add('active')</script>`
    },
    reschedule: {
        mainBody: ``,
        script: `<script>document.querySelector('.reschedule').classList.add('active')</script>`
    },
}

module.exports = userData