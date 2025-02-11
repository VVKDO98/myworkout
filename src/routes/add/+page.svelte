<script>
    import { goto } from "$app/navigation";
  
    let name = "";
    let category = "";
    let selected = false;
    let series = "";
    let reps = "";
    let weights = "";
  
    async function addExercise() {
      const res = await fetch("/api/post", { // <-- Changement ici
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, selected, series, reps, weights }),
      });
  
      const data = await res.json();
      if (data.success) {
        alert("Exercice ajouté !");
        goto("/"); // Redirection après ajout
      } else {
        alert("Erreur lors de l'ajout");
      }
    }
  </script>
  
  <h1>Ajouter un exercice</h1>
  <form on:submit|preventDefault={addExercise}>
    <label>Nom :</label>
    <input type="text" bind:value={name} required />
  
    <label>Catégorie :</label>
    <input type="text" bind:value={category} required />
  
    <label>Cocher si sélectionné :</label>
    <input type="checkbox" bind:checked={selected} />
  
    <label>Nombre de séries :</label>
    <input type="number" bind:value={series} required />
  
    <label>Répétitions :</label>
    <input type="text" bind:value={reps} required />
  
    <label>Poids :</label>
    <input type="number" bind:value={weights} required />
  
    <button type="submit">Ajouter</button>
    <a href="/">Annuler</a>
  </form>
  
  