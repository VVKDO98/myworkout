<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let id;
  let name = "";
  let category = "";
  let selected = false;
  let series = "";
  let reps = "";
  let weights = "";

  async function fetchExercise() {
    const res = await fetch(`/api/workout/${id}`);
    const data = await res.json();

    if (data.success === false) {
      alert("Exercice non trouvé !");
      history.back();
      return;
    }

    // Remplir les champs avec les valeurs actuelles
    name = data.name;
    category = data.category;
    selected = data.selected === 1; // Conversion INT -> Boolean
    series = data.series;
    reps = data.reps;
    weights = data.weights;
  }

  async function updateExercise() {
    const res = await fetch("/api/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, category, selected, series, reps, weights }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Exercice mis à jour !");
      history.back();
    } else {
      alert("Erreur lors de la mise à jour");
    }
  }

  // Récupérer l'ID depuis l'URL
  $: id = $page.params.id;

  // Charger les données existantes
  onMount(fetchExercise);
</script>

<h1>Modifier l'exercice</h1>
<form on:submit|preventDefault={updateExercise}>
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

  <button type="submit">Mettre à jour</button>
  <a href="/">Annuler</a>
</form>
