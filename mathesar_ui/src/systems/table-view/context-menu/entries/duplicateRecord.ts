import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';

import { iconDuplicateRecord } from '@mathesar/icons';
import type { TabularData } from '@mathesar/stores/table-data';
import { duplicateRecord as duplicateRecordAction } from '@mathesar/systems/table-view/row/rowActions';
import { buttonMenuEntry } from '@mathesar-component-library';

export function* duplicateRecord(p: {
  rowId: string;
  tabularData: TabularData;
}) {
  const canInsertRecords = get(p.tabularData.canInsertRecords);
  if (!canInsertRecords) return;

  yield buttonMenuEntry({
    icon: iconDuplicateRecord,
    label: get(_)('duplicate_record'),
    onClick: () => {
      duplicateRecordAction(p.tabularData, p.rowId);
    },
  });
}
