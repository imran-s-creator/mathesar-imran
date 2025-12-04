<script lang="ts">
  import { getTabularDataStoreFromContext } from '@mathesar/stores/table-data';
  import RowActionsController from '@mathesar/systems/table-view/row/RowActionsController.svelte';
  import { AnchorButton, Button, Icon } from '@mathesar-component-library';

  const tabularData = getTabularDataStoreFromContext();

  $: ({ selection } = $tabularData);
  $: selectedRowIds = $selection.rowIds;
</script>

<RowActionsController rowIds={selectedRowIds} let:actions>
  <div class="actions-container">
    {#if !actions.viewInModal.hidden}
      <Button
        on:click={actions.viewInModal.handler}
        disabled={actions.viewInModal.disabled}
        appearance="action"
      >
        <Icon {...actions.viewInModal.icon} />
        <span>{actions.viewInModal.label}</span>
      </Button>
    {/if}

    {#if !actions.openPage.hidden}
      <AnchorButton
        href={actions.openPage.href}
        disabled={actions.openPage.disabled}
        appearance="action"
      >
        <Icon {...actions.openPage.icon} />
        <span>{actions.openPage.label}</span>
      </AnchorButton>
    {/if}

    {#if !actions.duplicate.hidden}
      <Button
        on:click={actions.duplicate.handler}
        disabled={actions.duplicate.disabled}
        appearance="action"
      >
        <Icon {...actions.duplicate.icon} />
        <span>{actions.duplicate.label}</span>
      </Button>
    {/if}

    {#if !actions.delete.hidden}
      <Button
        on:click={actions.delete.handler}
        disabled={actions.delete.disabled}
        appearance="danger"
      >
        <Icon {...actions.delete.icon} />
        <span>{actions.delete.label}</span>
      </Button>
    {/if}
  </div>
</RowActionsController>

<style lang="scss">
  .actions-container {
    display: flex;
    flex-direction: column;

    > :global(* + *) {
      margin-top: 0.5rem;
    }
  }
</style>
