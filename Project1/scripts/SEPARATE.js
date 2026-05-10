const supabaseUrl = "https://etqoygahwfwclfgqoxqk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0cW95Z2Fod2Z3Y2xmZ3FveHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzODU4MzksImV4cCI6MjA4Njk2MTgzOX0.UV3l-ynuuaaDd9anLfa197o0kaQiT1PggyjsS-xn9sQ";
const supa = supabase.createClient(supabaseUrl, supabaseKey);
  
  document.getElementById("form").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const entry = {
          category: document.getElementById("category").value,
          date: document.getElementById("date").value,
  
          opponent: document.getElementById("opponent").value || null,
          score: document.getElementById("score").value || null,
  
          time: document.getElementById("time").value || null,
          overworld: document.getElementById("overworld").value || null,
          bastion: document.getElementById("bastion").value || null,
          end_enter: document.getElementById("end_enter").value || null,
  
          mission: document.getElementById("mission").value || null,
          status: document.getElementById("status").value || null,
  
          notes: document.getElementById("notes").value || null
      };
  
      if (!entry.category || !entry.date) {
          alert("Category and date required.");
          return;
      }
  
      const { error } = await supa.from("entries").insert([entry]);
  
      if (error) {
          console.error(error);
          alert("Error: " + error.message);
      } else {
          alert("Saved.");
          document.getElementById("form").reset();
      }
  });


