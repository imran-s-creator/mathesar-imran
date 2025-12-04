import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';

import { iconDeleteMajor } from '@mathesar/icons';
import type { TabularData } from '@mathesar/stores/table-data';
import { deleteRecords as deleteRecordsAction } from '@mathesar/systems/table-view/row/rowActions';
import { buttonMenuEntry } from '@mathesar-component-library';

export function* deleteRecords(p: {
  rowIds: string[];
  tabularData: TabularData;
}) {
  const canDeleteRecords = get(p.tabularData.canDeleteRecords);
  if (!canDeleteRecords) return;

  yield buttonMenuEntry({
    icon: iconDeleteMajor,
    danger: true,
    label: get(_)('delete_records', {
      values: { count: p.rowIds.length },
    }),
    onClick: () => {
      deleteRecordsAction(p.tabularData, p.rowIds);
    },
  });
}
