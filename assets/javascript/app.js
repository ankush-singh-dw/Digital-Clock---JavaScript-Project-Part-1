window.addEventListener("load", () => {
    const body = document.querySelector("body");
    const container = body.querySelector(".container");
    const timeContainer = container.querySelector(".timeContainer");
    const dateContainer = container.querySelector(".dateContainer");
    const messageContainer = body.querySelector(".messageContainer");
    const heading = messageContainer.querySelector(".heading");
    const text = messageContainer.querySelector(".text");
    const icon = messageContainer.querySelector(".icon");
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    container.addEventListener("click", () => {
        let timeText = timeContainer.innerText;
        let dateText = dateContainer.innerText;
        let copiedTextBe = `Time: ${timeText} on ${dateText}`;
        if(navigator.clipboard) {
            navigator.clipboard.writeText(copiedTextBe).then(() => {
                heading.textContent = "Copied";
                text.textContent = "Your current time is successfully copied to clipboard.";
                messageContainer.classList.add("active");
            }).catch(() => {
                heading.textContent = "Error";
                text.textContent = "Your current time cannot be copied to clipboard.";
                messageContainer.classList.add("active");
            });
        } else {
            heading.textContent = "Error";
            text.textContent = "Your current time cannot be copied to clipboard as it is not supported in your browser.";
            messageContainer.classList.add("active");
        };
    });
    icon.addEventListener("click", () => {
        messageContainer.classList.remove("active");
    });
    function updateTime() {
        let date = new Date();
        let eHour = date.getHours();
        let eMinute = date.getMinutes();
        let eSecond = date.getSeconds();
        let eAMPM = "AM";
        let eDate = date.getDate();
        let eMonth = date.getMonth();
        let eYear = date.getFullYear();
        if(eHour > 12) {
            eHour -= 12;
            eAMPM = "PM";
        } else {
            if(eHour == 12) {
                eAMPM = "PM";
            } else {
                if(eHour == 0) {
                    eHour = 12;
                };
            };
        };
        if(eHour < 10) {
            eHour = `0${eHour}`;
        };
        if(eMinute < 10) {
            eMinute = `0${eMinute}`;
        };
        if(eSecond < 10) {
            eSecond = `0${eSecond}`;
        };
        if(eDate < 10) {
            eDate = `0${eDate}`;
        };
        let eMonthName = monthName[eMonth];
        let currentTime = `${eHour} : ${eMinute} : ${eSecond} ${eAMPM}`;
        let currentDate = `${eDate} ${eMonthName} ${eYear}`;
        timeContainer.textContent = currentTime;
        dateContainer.textContent = currentDate;
        requestAnimationFrame(updateTime);
    };
    updateTime();
});