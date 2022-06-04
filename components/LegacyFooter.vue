<template>
  <div>
    <footer class="bg-[#f8f9fa] text-[#205081] text-[14px] py-8">
      <div class="max-w-[1230px] mx-auto flex p-10">
        <div class="flex flex-col flex-1 xl:flex-row gap-28">
          <div class="">
            <!-- Footer widget area 1 -->
            <div class="flex flex-col">
              <h4 class="font-semibold mb-6">PEDROSA</h4>
              <div class="mb-5">
                <div class="leading-6">Gremio Silleros y Albarderos, 10. Polígono Son Castelló</div>
                <div class="leading-6">07009 Palma de Mallorca</div>
                <div class="leading-6">Tel. 971 430 348</div>
              </div>
              <div class="mb-5">
                <div class="leading-6">Calle Río Júcar s/n. Polígono Can Negre</div>
                <div class="leading-6">07840 Santa Eulalia del Riu - Ibiza</div>
                <div class="leading-6">Tel. 971 316 093</div>
              </div>
              <div class="mb-10">
                <div class="leading-6">Cap de Cavalleria, 15b</div>
                <div class="leading-6">07714 Maó - Menorca - *Asociado</div>
                <div class="leading-6">Tel. 971 367 201</div>
              </div>
              <div class="flex">
                <a href="https://www.pedrosa.net/contacto.php" class="px-5 py-3 rounded bg-[#205081] text-[12px] text-white font-semibold">FORMULARIO DE CONTACTO</a>
              </div>
            </div>
            <!-- end: Footer widget area 1 -->
          </div>
          <div class="">
            <!-- Footer widget area 2 -->
            <div class="widget">
              <h4 class="font-semibold mb-6">MAPA WEB</h4>
              <ul class="list">
                <li class="mb-2.5"><a href="https://www.pedrosa.net/index.php">Home</a></li>
                <li class="mb-2.5"><a href="https://www.pedrosa.net/empresa.php">Empresa</a></li>
                <li class="mb-2.5"><a href="https://catalogo.pedrosa.net/">Productos</a></li>
                <li class="mb-2.5"><a href="https://www.pedrosa.net/marca.php">Marcas</a></li>
                <li class="mb-2.5"><a href="https://www.pedrosa.net/servicios.php">Servicios</a></li>
                <li class="mb-2.5"><a href="https://www.pedrosa.net/novedades.php">Novedades</a></li>
                <li class="mb-2.5"><a href="https://www.pedrosa.net/clientes.php">Área Clientes</a></li>
                <li class="mb-2.5"><a href="https://www.pedrosa.net/contacto.php#trabajo">Trabaja con nosotros</a></li>
              </ul>
            </div>
            <!-- end: Footer widget area 2 -->
          </div>
        </div>
      </div>
    </footer>
    <footer class="bg-[#eff1f4] flex justify-center items-center p-10 text-[#205081] text-[13px]">
      <div class="flex flex-row gap-1 items-center text-center">
        © 2021 PEDROSA - <a href="https://www.pedrosa.net/legal.php" rel="noopener">Aviso legal y Política de privacidad. Política de Cookies</a>
        <div class="flex justify-center items-center"><img class="flex self-center" src="https://www.pedrosa.net/images/sello_ministerio.png" alt="" /></div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  layout: 'default',
})
</script>

<style scoped>
footer {
  font-family: 'Poppins', serif;
}
</style>
