

// -------------------------
// TAB SWITCHING
// -------------------------

function switchTab(event, tabId) {

    const contents = document.querySelectorAll(".tab-content");

    contents.forEach(content => {
        content.classList.remove("active");
    });

    const buttons = document.querySelectorAll(".tab-btn");

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    document.getElementById(tabId).classList.add("active");
    event.currentTarget.classList.add("active");
}

    
// SUPABASE
const supabaseUrl = "https://etqoygahwfwclfgqoxqk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0cW95Z2Fod2Z3Y2xmZ3FveHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzODU4MzksImV4cCI6MjA4Njk2MTgzOX0.UV3l-ynuuaaDd9anLfa197o0kaQiT1PggyjsS-xn9sQ";
const supa = supabase.createClient(
    supabaseUrl,
    supabaseKey
);

// -------------------------
// FORM SUBMISSION
// -------------------------

document.getElementById("form").addEventListener("submit", async function(e) {

    e.preventDefault();

    console.log("FORM SUBMITTED");

    // Find the tab currently being used
    const activeTab = document.querySelector(".tab-content.active");

    console.log("Active tab:", activeTab.id);


    // Determine category
    let category = "";

    if (activeTab.id === "tab1") {
        category = "spacex";
    }

    if (activeTab.id === "tab2") {
        category = "soccer";
    }

    if (activeTab.id === "tab3") {
        category = "baseball";
    }

    if (activeTab.id === "tab4") {
        category = "mcsr";
    }

    if (activeTab.id === "tab5") {
        category = "other";
    }


    // Get information ONLY from the active tab
    const entry = {

        category: category,
    
        date: activeTab.querySelector("#date")?.value || null,
    
        opponent: activeTab.querySelector("#opponent")?.value || null,
    
        score: activeTab.querySelector("#score")?.value || null,
    
        time: activeTab.querySelector("#time")?.value || null,
    
        overworld: activeTab.querySelector("#overworld")?.value || null,
    
        bastion: activeTab.querySelector("#bastion")?.value || null,
    
        end_enter: activeTab.querySelector("#end_enter")?.value || null,
    
        mission: activeTab.querySelector("#mission")?.value || null,
    
        status: activeTab.querySelector("#status")?.value || null,
    
        team: activeTab.querySelector("#team")?.value || null,
    
        notes: activeTab.querySelector("#notes")?.value || null
    };


    console.log("ENTRY BEING SENT:", entry);


    // Make sure we have a date
    if (!entry.date) {

        alert("Please enter a date.");

        return;
    }


    // Send the entry to Supabase
    const { data, error } = await supa
        .from("entries")
        .insert([entry])
        .select();


    // If Supabase gives us an error
    if (error) {

        console.error("SUPABASE ERROR:", error);

        alert("Supabase Error: " + error.message);

        return;
    }


    // Success
    console.log("SUCCESS! Saved to Supabase:", data);

    alert("Saved to Supabase!");

    // Clear the form
    activeTab.querySelectorAll("input, textarea").forEach(input => {
        input.value = "";
    });

});