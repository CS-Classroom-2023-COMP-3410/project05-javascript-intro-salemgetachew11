document.addEventListener('DOMContentLoaded', function () {
    const clockElement = document.getElementById('clock');
    const toggleFormatBtn = document.getElementById('toggleFormat');
    const colorPicker = document.getElementById('colorPicker');
    const fontSizePicker = document.getElementById('fontSizePicker');
    const alarmTime = document.getElementById('alarmTime');
    const setAlarmBtn = document.getElementById('setAlarm');
    const alarmMessage = document.getElementById('alarmMessage');
    let is24Hour = JSON.parse(localStorage.getItem('is24Hour')) || true;

    // Load saved settings from localStorage
    const savedColor = localStorage.getItem('clockColor');
    const savedFontSize = localStorage.getItem('clockFontSize');
    if (savedColor) {
        clockElement.style.color = savedColor;
        colorPicker.value = savedColor;
    }
    if (savedFontSize) {
        clockElement.style.fontSize = `${savedFontSize}px`;
        fontSizePicker.value = savedFontSize;
    }

    // Update clock every second
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        // Adjust format
        if (!is24Hour) {
            const ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12 || 12; // Convert to 12-hour format
            clockElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}${ampm}`;
        } else {
            clockElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Toggle between 12-hour and 24-hour formats
    toggleFormatBtn.addEventListener('click', () => {
        is24Hour = !is24Hour;
        localStorage.setItem('is24Hour', JSON.stringify(is24Hour));
    });

    // Change clock color
    colorPicker.addEventListener('input', () => {
        const selectedColor = colorPicker.value;
        clockElement.style.color = selectedColor;
        localStorage.setItem('clockColor', selectedColor);
    });

    // Change clock font size
    fontSizePicker.addEventListener('input', () => {
        const selectedFontSize = fontSizePicker.value;
        clockElement.style.fontSize = `${selectedFontSize}px`;
        localStorage.setItem('clockFontSize', selectedFontSize);
    });

    // Alarm functionality
    setAlarmBtn.addEventListener('click', () => {
        const alarmTimeValue = alarmTime.value;
        if (!alarmTimeValue) {
            alarmMessage.textContent = 'Please set a valid alarm time.';
            return;
        }
        localStorage.setItem('alarmTime', alarmTimeValue);
        alarmMessage.textContent = `Alarm set for ${alarmTimeValue}`;
        checkAlarm(alarmTimeValue);
    });

    function checkAlarm(alarmTimeValue) {
        const [alarmHours, alarmMinutes] = alarmTimeValue.split(':').map(Number);
        const now = new Date();
        const alarmDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            alarmHours,
            alarmMinutes
        );

        if (now > alarmDate) {
            alarmDate.setDate(alarmDate.getDate() + 1); // Set alarm for next day if time has passed
        }

        const timeToAlarm = alarmDate.getTime() - now.getTime();
        setTimeout(() => {
            alarmMessage.textContent = 'Alarm ringing!';
            setTimeout(() => (alarmMessage.textContent = ''), 60000); // Clear alarm after 1 minute
        }, timeToAlarm);
    }

    // Reload alarm on page load if set
    const savedAlarmTime = localStorage.getItem('alarmTime');
    if (savedAlarmTime) {
        alarmMessage.textContent = `Alarm set for ${savedAlarmTime}`;
        checkAlarm(savedAlarmTime);
    }
});
