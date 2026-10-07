/* Category definitions and article content come from Jekyll, not a second catalog. */
(function () {
  'use strict';

  var library = document.querySelector('[data-blog-library]');
  if (!library) return;

  var categoryButtons = Array.from(library.querySelectorAll('[data-category]'));
  if (!categoryButtons.length) return;
  var groups = Array.from(library.querySelectorAll('[data-category-group]'));
  var input = library.querySelector('#blog-search-input');
  var scope = library.querySelector('#blog-search-scope');
  var clear = library.querySelector('.blog-search__clear');
  var empty = library.querySelector('.blog-empty');
  var reset = library.querySelector('.blog-empty__reset');
  var heading = library.querySelector('#blog-results-heading');
  var path = library.querySelector('[data-result-path]');
  var count = library.querySelector('[data-result-count]');
  var list = library.querySelector('.blog-posts');
  var state;

  function normalize(value) {
    return value.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
  }

  var posts = Array.from(list.querySelectorAll('.blog-entry')).map(function (element) {
    return {
      element: element,
      topic: element.dataset.topic,
      subtopic: element.dataset.subtopic,
      uploaded: Number(element.dataset.uploaded),
      text: normalize(element.textContent)
    };
  }).sort(function (a, b) { return b.uploaded - a.uploaded; });
  posts.forEach(function (post) { list.appendChild(post.element); });

  function activeCategory() {
    return categoryButtons.find(function (button) { return button.dataset.category === state.category; });
  }

  function activeGroup() {
    return groups.find(function (group) { return group.dataset.categoryGroup === state.category; });
  }

  function readLocation() {
    var params = new URLSearchParams(window.location.search);
    var category = categoryButtons.find(function (button) { return button.dataset.category === params.get('category'); });
    state = {
      category: (category || categoryButtons[0]).dataset.category,
      subcategory: params.get('subcategory') || '',
      query: params.get('q') || '',
      scope: params.get('scope') === 'all' ? 'all' : 'current'
    };
    var validSubcategory = Array.from(activeGroup().querySelectorAll('[data-subcategory]')).some(function (button) {
      return button.dataset.subcategory === state.subcategory;
    });
    if (!validSubcategory) state.subcategory = '';
    input.value = state.query;
    scope.value = state.scope;
  }

  function writeLocation(push) {
    var url = new URL(window.location.href);
    ['category', 'subcategory', 'q', 'scope'].forEach(function (key) { url.searchParams.delete(key); });
    if (state.category !== categoryButtons[0].dataset.category) url.searchParams.set('category', state.category);
    if (state.subcategory) url.searchParams.set('subcategory', state.subcategory);
    if (state.query.trim()) url.searchParams.set('q', state.query.trim());
    if (state.scope === 'all') url.searchParams.set('scope', 'all');
    if (url.href !== window.location.href) {
      window.history[push ? 'pushState' : 'replaceState'](null, '', url);
    }
  }

  function render() {
    var all = state.scope === 'all';
    var query = normalize(state.query);
    var terms = query ? query.split(' ') : [];
    var visible = 0;
    var category = activeCategory();
    var selectedChild;

    categoryButtons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(!all && button === category));
    });
    groups.forEach(function (group) {
      group.hidden = group !== activeGroup();
      group.querySelectorAll('[data-subcategory]').forEach(function (button) {
        var selected = button.dataset.subcategory === state.subcategory;
        button.setAttribute('aria-pressed', String(!all && selected));
        if (!group.hidden && selected) selectedChild = button;
      });
    });

    posts.forEach(function (post) {
      var matchesCategory = all || (post.topic === state.category && (!state.subcategory || post.subtopic === state.subcategory));
      var matchesQuery = terms.every(function (term) { return post.text.indexOf(term) !== -1; });
      var matches = matchesCategory && matchesQuery;
      post.element.hidden = !matches;
      if (matches) visible += 1;
    });

    heading.textContent = all ? '全部文章' : (state.subcategory ? selectedChild.dataset.label : category.dataset.label);
    path.textContent = all ? '跨分类检索' : (state.subcategory ? category.dataset.label + ' / ' + selectedChild.dataset.label : '学习笔记与论文阅读');
    count.textContent = query ? '找到 ' + visible + ' 篇文章' : visible + ' 篇文章';
    clear.hidden = !state.query;
    empty.hidden = visible !== 0;
    reset.hidden = !query;
    library.querySelector('[data-empty-title]').textContent = query ? '没有找到相关文章' : '这个分类还没有文章';
    library.querySelector('[data-empty-description]').textContent = query ? '试试其他关键词，或将搜索范围切换为「全部分类」。' : '新的文章将在这里展示。';
  }

  categoryButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      state.category = button.dataset.category;
      state.subcategory = '';
      state.scope = 'current';
      scope.value = state.scope;
      writeLocation(true);
      render();
    });
  });
  groups.forEach(function (group) {
    group.querySelectorAll('[data-subcategory]').forEach(function (button) {
      button.addEventListener('click', function () {
        state.category = group.dataset.categoryGroup;
        state.subcategory = button.dataset.subcategory;
        state.scope = 'current';
        scope.value = state.scope;
        writeLocation(true);
        render();
      });
    });
  });
  input.addEventListener('input', function () {
    state.query = input.value;
    writeLocation(false);
    render();
  });
  scope.addEventListener('change', function () {
    state.scope = scope.value;
    writeLocation(false);
    render();
  });
  library.querySelector('.blog-search').addEventListener('submit', function (event) { event.preventDefault(); });

  function clearSearch() {
    state.query = '';
    input.value = '';
    writeLocation(false);
    render();
    input.focus();
  }
  clear.addEventListener('click', clearSearch);
  reset.addEventListener('click', clearSearch);
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') clearSearch();
  });
  window.addEventListener('popstate', function () { readLocation(); render(); });

  readLocation();
  render();
}());
