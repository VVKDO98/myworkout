<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
  
    let workouts = writable([]);
  
    async function getWorkouts() {
      try {
        const res = await fetch('/api/getpull');
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des workouts");
        }
        const data = await res.json();
        workouts.set(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  
    onMount(getWorkouts);
  </script>
  
  <main>
    <h1><a href="/">MyWorkout</a></h1>
    <div>
      <a href="/push">Push</a>
      <a href="/pull">Pull</a>
      <a href="/legs">Legs</a>
      <a href="/add">Ajouter un exo</a>
    </div>
    <h2>Liste de tous les exercices</h2>
  </main>
  <!-- Affichage des données -->
  {#if $workouts.length > 0}
    {#each $workouts as workout}
      <div>
        <h3>Nom : {workout.name}</h3>
        <p>ID : {workout.id}</p>
        <p>Catégorie : {workout.category}</p>
        <p>Séries : {workout.series}</p>
        <p>Répétitions : {workout.reps}</p>
        <p>Poids : {workout.weights}</p>
      </div>
    {/each}
    {:else}
    <p>Aucun workout trouvé.</p>
  {/if}