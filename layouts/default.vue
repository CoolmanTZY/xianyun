<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
  // 注册组件
  components: {
    Header,
    Footer
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
a {
  color: inherit;
  text-decoration: none;
}
em,
i {
  font-style: normal;
}
</style>
