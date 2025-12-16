const output = document.getElementById('terminal-output');
const input = document.getElementById('command-input');
const prompt = document.getElementById('prompt');

let currentState = 'LOGIN'; 
let logHistory = []; 
let logsContent = ""; 

// --- CORE UTILITY FUNCTIONS ---

// Simulates the slow typing effect
function typeText(text, callback) {
    let i = 0;
    input.disabled = true;
    function typing() {
        if (i < text.length) {
            output.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 25); 
        } else {
            output.innerHTML += '<br>';
            input.disabled = false;
            if (callback) callback();
        }
    }
    typing();
}

// Clears the screen (like CLS)
function cls() {
    output.innerHTML = '';
}

// Gets current formatted date and time for logging
function getTimeStamp() {
    const now = new Date();
    // Using simple format for console look: MM/DD/YYYY HH:MM:SS
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `[${date} ${time}]`;
}

// Appends a formatted log entry (replaces CALL :LOG_ENTRY_FUNCTION)
function logEntry(description) {
    const entry = `${getTimeStamp()} AUDIT: ${description}\n`;
    logHistory.push(entry);
}

// --- TERMINAL STATES AND CONTENT ---

const LOGIN_SCREEN = [
    '                                   =================================',
    '                                    J A L A N D H A R   L A B O R A T O R Y',
    '                                       SECURE TERMINAL ACCESS',
    '                                   =================================',
    '',
    '                                      Attempting secure handshake...',
];

const MENU_SCREEN = [
    '',
    '',
    '                                   =================================',
    '                                      J.R.L. MAIN SYSTEM MENU',
    '                                   =================================',
    '',
    '                                   [1] - View Surveillance Logs (Sector 11)',
    '                                   [2] - Initiate Demogorgon Tracker',
    '                                   [3] - Run System Diagnostics',
    '                                   [4] - Initiate Data Packet Transfer (Sector 001)', // New!
    '                                   [5] - Check External Communication Matrix', // New!
    '                                   [6] - View Current Sensor Readings (Anomaly Proximity)', // New!
    '                                   [7] - EXIT TERMINAL', 
    '',
];

// Content for the surveillance logs (Mix in your custom lore!)
function getLogContent() {
    return logsContent + 
`JALANDHAR REGIONAL LABORATORY - SECTOR 11 LOG
Date: 1983-11-07 (TUESDAY)
--------------------------------------------------------------------------------
[08:00] ROUTINE: Systems check 100% nominal.
[12:30] REPORT: Localized power fluctuation noted (0.3 seconds). Source undetermined.
[14:15] ANOMALY: Subject 011 recorded unusual distress. Spontaneous mild E.M.I. detected.
[21:05] WARNING: Personnel ID: 749-B (Security Guard J. Scott) failed to report for shift change.
[21:15] ALERT: Gate 03 access panel shows signs of forced entry. Trace amounts of unknown biological substance found.
--------------------------------------------------------------------------------
\n` + logHistory.join(''); // Append real-time logs here
}

// --- STATE HANDLERS ---

function handleLogin() {
    LOGIN_SCREEN.forEach(line => output.innerHTML += line + '<br>');

    typeText('Connection established.', () => {
        typeText('Verifying user credentials...', () => {
            typeText('ACCESS GRANTED. Welcome.', () => {
                logEntry("Terminal Access Granted by User");
                setTimeout(showMenu, 1000);
            });
        });
    });
}

function showMenu() {
    cls();
    MENU_SCREEN.forEach(line => output.innerHTML += line + '<br>');
    prompt.textContent = 'JRL_ADMIN> ';
    currentState = 'MENU';
    input.focus();
}

function handleMenuCommand(command) {
    switch (command.trim()) {
        case '1':
            handleSurveillance();
            break;
        case '2':
            handleTracker();
            break;
        case '3':
            handleStatus();
            break;
        case '4':
            handleDataTransfer(); // New!
            break;
        case '5':
            handleCommMatrix(); // New!
            break;
        case '6':
            handleSensorReadings(); // New!
            break;
        case '7':
            handleExit();
            break;
        default:
            typeText('Invalid selection. Please use 1-7.', showMenu);
    }
}

// --- SPECIFIC TASK HANDLERS (Replaces batch labels) ---

function handleSurveillance() {
    cls();
    logEntry("User viewed Surveillance Logs (Sector 11)");
    typeText('                                   Retrieving files from Sector 11...', () => {
        output.innerHTML += '<br>';
        // Display the log content
        output.innerHTML += getLogContent().replace(/\n/g, '<br>');
        typeText('                                   Log file opened. Press ENTER to return.', () => {
            currentState = 'PAUSE';
            prompt.textContent = '...';
        });
    });
}

function handleTracker() {
    cls();
    typeText('                                Initiating Demogorgon signature scan...', () => {
        typeText('                                Scanning for bio-signatures...', () => {
            output.innerHTML += '<br>';
            typeText('                                ** SCANNING COMPLETE **', () => {
                typeText('                                No signature detected. Return to menu.', () => {
                    setTimeout(showMenu, 1500);
                });
            });
        });
    });
}

function handleStatus() {
    cls();
    typeText('                                        Running Diagnostic Check:', () => {
        output.innerHTML += '<br>';
        typeText('                                      OS Name: Windows 10 Pro (JRL Custom Build)', () => {
            typeText('                                      System Manufacturer: JRL Mainframe', () => {
                typeText('                                      Total Memory: 65536MB', () => {
                    typeText('                                      All critical systems nominal. Press ENTER to return.', () => {
                        currentState = 'PAUSE';
                        prompt.textContent = '...';
                    });
                });
            });
        });
    });
}


// --- 4. DATA PACKET TRANSFER (New Web Feature) ---
function handleDataTransfer() {
    cls();
    logEntry("User initiated classified data transfer (Sector 001)");
    typeText('                                   SECURE DATA PACKET TRANSFER PROTOCOL INITIATED.', () => {
        typeText('                                   [STATUS: 0%]', () => {
            setTimeout(() => { typeText('                                   [STATUS: 35%] - Encrypting metadata...', () => {
                setTimeout(() => { typeText('                                   [STATUS: 78%] - Transfer buffer secure...', () => {
                    setTimeout(() => { 
                        typeText('                                   [STATUS: 100%] - Transfer Complete. Data Integrity Check: OK.', () => {
                            
                            // *** DOWLOAD LOGIC ***
                            const reportContent = "CLASSIFIED JRL REPORT 404-B: Unexplained energy fluctuations continue near the old Sector 11 facility. Auditory artifacts were recorded, matching previously documented 'guttural' sounds. Recommend isolating and analyzing all data points related to subject 'Eleven' and the 1983 incident. Do not share this information with external agencies. END OF REPORT.";
                            const blob = new Blob([reportContent], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = 'JRL_Classified_Report_404B.txt';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            
                            typeText('                                   Report saved to local system. Press ENTER to return.', () => {
                                currentState = 'PAUSE';
                                prompt.textContent = '...';
                            });
                        });
                    }, 2000); 
                });
            }, 2000);
        });
    }, 1000);
});
}

// --- 5. EXTERNAL COMMUNICATION MATRIX (New Web Feature) ---
function handleCommMatrix() {
    cls();
    logEntry("User accessed External Communication Matrix");
    typeText('                                   EXTERNAL COMMUNICATIONS LOG - ENCRYPTED', () => {
        typeText('                                   ======================================', () => {
            typeText('                                   [01:15 IST] INTERCEPT: Signal Type F-6. Bandwidth: 443MHz.', () => {
                typeText('                                   CONTENT: Repeating sequence of "R U S S I A" then static.', () => {
                typeText('                                   [01:17 IST] INTERCEPT: Signal Type G-3. Bandwidth: Unknown.', () => {
                    typeText('                                   CONTENT: Cryptic string: 01010111 01001001 01001100 01001100', () => {
                        typeText('                                   [01:25 IST] INTERCEPT: Signal Type F-6. Bandwidth: 443MHz.', () => {
                            typeText('                                   CONTENT: Repeating sequence of "T R A V E L L E R"', () => {
                                typeText('                                   End of Log. Press ENTER to return.', () => {
                                    currentState = 'PAUSE';
                                    prompt.textContent = '...';
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

// --- 6. SENSOR READINGS (New Web Feature) ---
function handleSensorReadings() {
    cls();
    logEntry("User accessed Anomaly Proximity Sensor Readings");
    typeText('                                   ENVIRONMENTAL SENSOR READINGS - REAL TIME', () => {
        typeText('                                   =========================================', () => {
            typeText('                                   [TEMP]: 20.3 C (Normal) | [GRAVITY]: 9.807 m/s^2 (Normal)', () => {
                setTimeout(() => { 
                    typeText('                                   [EMF]: 1.2 uT (Stable) | [ATMOS]: 101.3 kPa (Stable)', () => {
                        setTimeout(() => { 
                            typeText('                                   Anomaly Proximity Alert: PING 1/3: Trace magnetic activity detected.', () => {
                                setTimeout(() => { 
                                    typeText('                                   Anomaly Proximity Alert: PING 2/3: Localized temporal distortion spike (0.01 sec).', () => {
                                        setTimeout(() => { 
                                            typeText('                                   Anomaly Proximity Alert: PING 3/3: ** HIGH ENERGY SIGNATURE DETECTED. CLOSING RIFT **', () => {
                                                typeText('                                   STATUS: Systems offline. Manual intervention required. Press ENTER to return.', () => {
                                                    currentState = 'PAUSE';
                                                    prompt.textContent = '...';
                                                });
                                            });
                                        }, 1500); 
                                    });
                                }, 1500); 
                            });
                        }, 1000); 
                    });
                }, 1000);
            });
        });
    });
}

function handleExit() {
    cls();
    typeText('                                 Disconnecting from JRL Network...', () => {
        typeText('                                  System Shutdown Complete.', () => {
            input.disabled = true;
            prompt.textContent = '';
        });
    });
}

// --- EVENT LISTENER (Handles user input) ---

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = input.value;
        input.value = ''; 

        if (currentState === 'PAUSE') {
            showMenu();
        } else if (currentState === 'MENU') {
            handleMenuCommand(command);
        }
        
        // Scroll to the bottom 
        output.scrollTop = output.scrollHeight;
    }
});

// --- INITIALIZATION ---
window.onload = function() {
    handleLogin();
    input.focus(); 
};
